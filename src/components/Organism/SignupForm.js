import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import cx from 'classnames';
import Button from '../atoms/Button';
import Grid from '../layout/Grid';
import GridItem from '../layout/GridItem';
import { signUpData as data } from '/data/signUp.js';
import StepperHeader from '@/components/molecules/StepperHeader';
import Icon from '../atoms/icon';
import AuthenticateUserForm from './authenticateUserForm';
import { useRouter } from 'next/router';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  // setback to false after testing
  const [accountCreated, setAccountCreated] = useState(false);
  const username = watch('username', '');
  const displayName = watch('displayName', '');
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const [loading, setLoading] = useState(false);

  const componentClassName = cx('c-signup-form', {
    [`c-signup-form--success`]: accountCreated,
  });

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setResponseMessage('');
    if (!acceptedTerms) {
      setResponseMessage('Error: Please accept the Terms of Service');
      return;
    }

    if (password !== confirmPassword) {
      setResponseMessage('Error: Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        ...data,
        agreement: acceptedTerms,
      });

      console.log('🔥 response', response);

      setAccountCreated(true);
      setResponseMessage(`Account created successfully`);
      router.push('/authenticate');
    } catch (error) {
      setResponseMessage(error.response.data.error.error);
    }

    setLoading(false);
  };

  const checkPasswordsMatch = () => {
    if (password !== confirmPassword) {
      return <span>Passwords do not match</span>;
    }
  };

  return (
    //   <div className={`${componentClassName}, `}>
    //     <Grid className='c-grid__signup-success'>
    //       <GridItem columnStart={1} columnEnd={13}>
    //         <Icon iconName='check' width='100' height='100' />
    //       </GridItem>
    //       <GridItem columnStart={1} columnEnd={13}>
    //         <div className='c-signup-success__content u-text-align--center'>
    //           <h2 className='c-signup-success__title u-heading--2xl'>
    //             {data.successHeading.textOne}
    //             <br /> {data.successHeading.textTwo}{' '}
    //             {displayName ? displayName : username}!
    //           </h2>
    //           <p className='c-signup-success__sub-title'>
    //             {data.successSubHeading.text}
    //           </p>
    //         </div>
    //       </GridItem>
    //     </Grid>
    //     <AuthenticateUserForm />
    //     <Grid className='c-signup-success__buttons' variant='autoFit'>
    //       <Button
    //         link={data.successButtonOne.link}
    //         text={data.successButtonOne.text}
    //       />
    //       <Button
    //         link={data.successButtonTwo.link}
    //         text={data.successButtonTwo.text}
    //         variant='secondary'
    //       />
    //     </Grid>
    //   </div>
    // ) : (
    <>
      <StepperHeader
        iconName="join"
        iconWidth="75"
        iconHeight="83"
        heading={data.heading.text}
        subHeading={data.subHeading.text}
      />
      <div className={componentClassName}>
        <p className="u-heading--lg u-text-align--center">
          {data.description.text}
        </p>
        <form
          className="c-form c-form__signup"
          onSubmit={handleSubmit(onSubmit)}>
          <Grid className="c-grid__signup-form">
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="email">
                Email:
              </label>
              {errors.email && (
                <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                  {errors.email.message}
                </span>
              )}
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className={`c-signup-form__input ${
                  errors.email && 'c-signup-form__input--error'
                } `}
                {...register('email', { required: 'Email is required' })}
              />
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" htmlFor="displayName">
                Display Name:
              </label>
              {errors.displayName && (
                <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                  {errors.displayName.message}
                </span>
              )}
              <input
                id="displayName"
                type="text"
                placeholder="Display Name"
                className={`c-signup-form__input ${
                  errors.displayName && 'c-signup-form__input--error'
                } `}
                {...register('displayName')}
              />
              <span className="c-field-note">
                Your display name is shown to other users before your full
                Mastodon address. It can be up to 30 characters.
              </span>
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <div className="c-signup-form__input--with-float">
                <label className="u-visually-hidden" htmlFor="username">
                  Username:
                </label>
                {errors.username && (
                  <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                    {errors.username.message}
                  </span>
                )}
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  className={`c-signup-form__input ${
                    errors.username && 'c-signup-form__input--error'
                  } `}
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
                <span className="label_input__append">@mastodon.social</span>
              </div>
              <span className="c-field-note">
                You can use letters, numbers, and underscores.
              </span>
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <label className="u-visually-hidden" hidden htmlFor="password">
                Password:
              </label>
              {errors.password && (
                <span className="c-input-error__message u-margin-bottom--sm u-display--inline-block">
                  {errors.password.message}
                </span>
              )}
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`c-signup-form__input ${
                  errors.password && 'c-signup-form__input--error'
                } `}
                {...register('password', { required: 'Password is required' })}
              />
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
                  I have read and agree to the{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://mastodon.social/privacy-policy">
                    privacy policy
                  </a>{' '}
                  and{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://mastodon.social/about">
                    community server rules
                  </a>
                  .
                </label>
                {!acceptedTerms && <span>{data.termsOfService.text}</span>}
              </div>
            </GridItem>
            <GridItem columnStart={5} columnEnd={9}>
              <Button
                loading={loading}
                type="submit"
                text={data.formButton.text}
              />
              {responseMessage && (
                <p className="c-error u-margin-top--lg u-body--copy">
                  {responseMessage}
                </p>
              )}
            </GridItem>
          </Grid>
        </form>
      </div>
    </>
  );
}
