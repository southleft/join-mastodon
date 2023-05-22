import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';

import { appsData as data } from '/data/apps.js';
import Image from 'next/image';

export default function MastodonApps() {
  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:image" content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg" />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
        <meta name="twitter:image" content="https://join-mastodon-poc.vercel.app/spread_mastodon_share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Logo />
      <main className="l-main c-page__interior">
        <StepperHeader
          iconName="enrich"
          iconWidth="75"
          iconHeight="83"
          heading={data.heading.text}
          subHeading={data.subHeading.text}
        />
        <div className="c-apps">
          <p className="u-text-align--center u-body--lg">
            {data.contentOne.text}
          </p>
          <div className="c-apps--box">
            <div className="c-apps__app">
              <Image
                src="/assets/apps/icecube.png"
                alt="IceCube"
                width="225"
                height="225"
              />
              <div className="c-apps__app--content">
                <h4 className="u-heading--xl">Ice Cubes for Mastodon</h4>
                <p className="u-body-copy">
                  A blazing fast Mastodon client <br /> Thomas Ricouard
                </p>
                <p>Designed for iPad</p>
                <div className="c-apps__ratings u-body--sm">
                  <Image
                    className="c-apps__ratings--stars"
                    alt="4.8 stars"
                    src="/assets/apps/stars.png"
                    width="73"
                    height="11"
                  />
                  4.8 • 926 Ratings
                </div>
                <p>Free • Offers In-App Purchases</p>
                <Button
                  className="c-app__content--button"
                  text="View Details & install"
                  newTab={true}
                  link="https://apps.apple.com/us/app/ice-cubes-for-mastodon/id6444915884"
                />
              </div>
            </div>
            <div className="c-apps__others">
              <h4 className="u-heading--xl">More Great Apps</h4>
              <ul className="c-other-apps__list">
                <li className="c-other-apps__list-item">
                  <a
                    className="c-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://joinmastodon.org/apps">
                    Other iOS apps
                  </a>
                </li>
                <li className="c-other-apps__list-item">
                  <a
                    className="c-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.apple.com/us/search/mastodon?src=globalnav">
                    Mac desktop apps
                  </a>
                </li>
                <li className="c-other-apps__list-item">
                  <a
                    className="c-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://play.google.com/store/search?q=mastodon&c=apps">
                    Android apps
                  </a>
                </li>
              </ul>
            </div>

            {/* <GridItem columnStart={5} columnEnd={9}></GridItem> */}
          </div>
          <p className="u-text-align--center u-heading--md">
            You are now done with our recommended steps to get started. Thanks
            for being part of Mastodon!
          </p>
          <Button
            className="c-app__button"
            text={data.ctaButton.text}
            link={data.ctaButton.link}
          />
        </div>
      </main>
    </div>
  );
}
