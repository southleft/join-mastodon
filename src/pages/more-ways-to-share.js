import Head from 'next/head';
import Grid from '@/components/layout/Grid';
import GridItem from '@/components/layout/GridItem';
import Card from '@/components/molecules/Card';
import Button from '@/components/molecules/Button';
import { disclaimer } from '../../data/universal';
import { moreWaysToShareData as data } from '../../data/moreWaysToShare';

export default function MoreWaysToShare() {
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
            <h1>{data.heading.text}</h1>
            <h2>{data.subHeading.text}</h2>
          </GridItem>
        </Grid>
        <Grid
          variant="autoFit"
          itemMinWidth="xl"
          className="u-text-align--center">
          {data.cards.map((card, i) => (
            <Card
              key={card.title + i}
              className="u-card__more-ways-to-share"
              title={card.title}
              iconName={card.icon}
              iconWidth={card.iconWidth}
              iconHeight={card.iconHeight}
              link={card.link}
              linkText={card.linkText}
            />
          ))}
        </Grid>
        <Grid className="u-text-align--center">
          <GridItem columnStart={5} columnEnd={9}>
            <Button text={data.ctaButton.text} link={data.ctaButton.link} />
          </GridItem>
        </Grid>
      </main>
    </div>
  );
}
