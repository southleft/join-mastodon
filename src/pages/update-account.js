import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Head from 'next/head';
import StepperHeader from '@/components/molecules/StepperHeader';
import Button from '@/components//molecules/Button';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function UpdateAccount() {
  const router = useRouter();
  const data = router.query;
  const { username, displayName } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('/missing.png');
  const [base64, setbase64] = useState('');
  const [backgroundSrc, setBackgroundSrc] = useState('/default-bg.png');
  const [BgBase64, setBgBase64] = useState('');

  const onSubmit = async (data) => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoading(true);

    try {
      const response = await axios.patch('/api/updateAccount', {
        accessToken,
        bio: data.bio,
        avatar: base64,
        header: BgBase64,
      });
    } catch (error) {}

    setLoading(false);
  };

  //TODO: make this more dry
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setbase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const updateAvatar = (event) => {
    setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    getBase64(event.target.files[0]);
  };

  //TODO: make this more dry
  function getBgBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBgBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const updateBackground = (event) => {
    setBackgroundSrc(URL.createObjectURL(event.target.files[0]));
    getBgBase64(event.target.files[0]);
  };

  return (
    <div className="content-wrapper c-page__interior">
      <Head>
        <title>Mastodon Update Account</title>
        <meta
          name="description"
          content="Mastodon account signup using Next.js, React and Mastodon API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img
        src="/-e-SpreadMastodon_Logo.png"
        alt="Spread Mastodon | Take Back Social"
        className="c-logo"
      />

      <main className="l-main">
        <StepperHeader
          iconName="join"
          iconWidth="75"
          iconHeight="83"
          heading="Adding Your Profile Images & Short Bio"
          subHeading="(Step 2 of 2; Optional But Recommended)"
        />
        <form
          className="c-form c-form__update-account"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="c-account-update" variant="autoFit">
            <div className="c-account-update--preview">
              <Image
                className="c-account-update--background"
                src={backgroundSrc}
                alt="avatar"
                width="621"
                height="279"
              />
              <Image
                className="c-account-update--avatar"
                src={avatarSrc}
                alt="avatar"
                width="200"
                height="200"
              />{' '}
              <p>{displayName ? displayName : username}</p>
              <p>bio words here</p>
            </div>
            <div className="c-account-update--form">
              <div>
                <input
                  onChange={(e) => updateAvatar(e)}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  type="file"
                  name="avatar"
                  id="avatar"
                />
                <span className="hint">
                  PNG, GIF or JPG. At most 2 MB. Will be downscaled to
                  1500x500px
                </span>
              </div>
              <div>
                <input
                  onChange={(e) => updateBackground(e)}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  type="file"
                  name="background"
                  id="background"
                />
                <span className="hint">
                  PNG, GIF or JPG. At most 2 MB. Will be downscaled to
                  1500x500px
                </span>
              </div>
              <div>
                <label htmlFor="bio">Bio:</label>
                <input id="bio" type="textArea" {...register('bio')} />
                {errors.bio && <span>{errors.bio.message}</span>}
              </div>
            </div>
          </div>
          <Grid variant="autoFit">
            <Button loading={loading} type="submit" text="Update" />
            <Button
              link="/"
              text="Skip this step for now"
              variant="secondary"
            />
          </Grid>
        </form>
      </main>
    </div>
  );
}
