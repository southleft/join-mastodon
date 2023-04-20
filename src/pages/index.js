import { useState, useEffect } from 'react';
import Head from 'next/head';
import Card from '@/components/molecules/Card';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';

import { homepageData as data } from '/data/homepage.js';

export default function Home() {
  const [rotateIndex, setRotateIndex] = useState(0);
  const heading = data.heading;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateIndex((index) => (index + 1) % heading.textRotate.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heading.textRotate.length]);

  return (
    <div>
      <Head>
        <title>{data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid className="u-text-align--center">
          <GridItem columnStart={4} columnEnd={10}>
            {/* <img src="/mastodon.svg" alt="Logo goes here" /> */}
            <h1 className="c-heading-one__special">
              <div>
                <span>{heading.textOne} </span>{' '}
                <span className="c-heading-one__rotate">
                  {' '}
                  {heading.textRotate[rotateIndex]}
                </span>{' '}
              </div>
              <span>{heading.textTwo}</span>
            </h1>
            <p>{data.subHeading.text}</p>
          </GridItem>
        </Grid>

        {/* Might make a Grid/Flex component going forward depending on other pages */}
        <Grid variant="autoFit">
          {data.cards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </Grid>

        <Grid>
          <GridItem columnStart={5} columnEnd={9}>
            <p className="u-text-align--center">{data.disclaimer.text}</p>
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
