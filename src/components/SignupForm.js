import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cx from 'classnames';
import Button from './molecules/Button';
import Grid from './layout/Grid';
import GridItem from './layout/GridItem';
import Icon from './atoms/icon';

import { signUpData as data } from '/data/signUp.js';

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [responseMessage, setResponseMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const username = watch('username', '');
  const displayName = watch('displayName', '');
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const [loading, setLoading] = useState(false);

  const componentClassName = cx('c-signup-form', {
    [`c-signup-form-${accountCreated}`]: accountCreated,
  });

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!acceptedTerms) {
      setResponseMessage('Error: Please accept the Terms of Service');
      return;
    }

    if (password !== confirmPassword) {
      setResponseMessage('Error: Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        ...data,
        agreement: acceptedTerms,
      });

      setAccountCreated(true);
      setResponseMessage(`Account created successfully`);
    } catch (error) {
      setResponseMessage(
        `Error: ${JSON.stringify(error.response.data.error.error)}`,
      );
    }

    setLoading(false);
  };

  const checkPasswordsMatch = () => {
    if (password !== confirmPassword) {
      return <span>Passwords do not match</span>;
    }
  };

  return accountCreated ? (
    <div className={`${componentClassName} c-signup-form--success`}>
      <Grid className="c-grid__signup-form--success">
        <GridItem columnStart={2} columnEnd={12}>
          {/* <Icon iconName="success" width="91" height="102" /> */}
          <div className="u-text-align--center">
            <h2 className="c-heading u-heading--2xl">
              {data.successHeading.textOne}
              <br /> {data.successHeading.textTwo}{' '}
              {displayName ? displayName : username}!
            </h2>
            <p className="c-content u-body--lg">{data.successMessage.text}</p>
          </div>
        </GridItem>
      </Grid>
      <Grid variant="autoFit">
        <Button link={data.buttonOne.link} text={data.buttonOne.text} />
        <Button
          variant="secondary"
          link={data.buttonTwo.link}
          text={data.buttonTwo.text}
        />
      </Grid>
    </div>
  ) : (
    <div className={componentClassName}>
      <p className="u-heading--lg u-text-align--center">
        Join the Whole Mastodon Network via this Trusted Community Server
      </p>
      <form className="c-signup-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="c-grid__signup-form">
          <GridItem columnStart={5} columnEnd={9}>
            <label className="u-visually-hidden" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className={`c-signup-form__input ${
                errors.email && 'c-signup-form__input--error'
              } `}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <label className="u-visually-hidden" htmlFor="displayName">
              Display Name:
            </label>
            <input
              id="displayName"
              type="text"
              placeholder="Display Name"
              className={`c-signup-form__input ${
                errors.displayName && 'c-signup-form__input--error'
              } `}
              {...register('displayName')}
            />
            {errors.displayName && <span>{errors.displayName.message}</span>}
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <label className="u-visually-hidden" htmlFor="username">
              Username:
            </label>
            <input
              id="username"
              type="text"
              placeholder="username@mastodon.social"
              className={`c-signup-form__input ${
                errors.username && 'c-signup-form__input--error'
              } `}
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <label className="u-visually-hidden" hidden htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={`c-signup-form__input ${
                errors.password && 'c-signup-form__input--error'
              } `}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <label className="u-visually-hidden" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Password is required',
              })}
              className={`c-signup-form__input ${
                errors.confirmPassword && 'c-signup-form__input--error'
              } `}
            />
            {checkPasswordsMatch()}
          </GridItem>

          <GridItem columnStart={4} columnEnd={11}>
            <div className="c-agreement">
              <label htmlFor="agreement">
                <input
                  id="agreement"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                I have read and agree with the community server rules and
                privacy policies.
              </label>
              {!acceptedTerms && (
                <span>Please accept the Terms of Service</span>
              )}
            </div>
          </GridItem>
          <GridItem columnStart={5} columnEnd={9}>
            <Button loading={loading} type="submit" text="Sign up" />
            {responseMessage && <div>{responseMessage}</div>}
          </GridItem>
        </Grid>
      </form>
    </div>
  );
}
