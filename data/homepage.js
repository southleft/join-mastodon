export const homepageData = {
  heading: {
    textOne: 'Welcome to your',
    textRotate: ['Better', 'Wholesome', 'Whimsical'],
    textTwo: 'Social Home',
  },
  subHeading: {
    text: "We can help you easily join Mastodon, enrich your experience if you've already joined, and share Mastodon with your friends and social networks.",
  },
  cards: [
    {
      title: "Don't have a Mastodon account?",
      description: 'Create an account in under a minute.',
      icon: 'join',
      iconWidth: '74',
      iconHeight: '74',
      link: '/sign-up',
      linkText: 'Join',
    },
    {
      title: 'Already have a Mastodon account?',
      description: 'Discover how to maximize your experience.',
      icon: 'enrich',
      iconWidth: '74',
      iconHeight: '74',
      link: '/follow-suggestions',
      linkText: 'Enrich',
    },
    {
      title: 'Want to help grow Mastodon?',
      description: 'Help your friends and social networks join you.',
      icon: 'share',
      link: '/',
      iconWidth: '74',
      iconHeight: '55',
      linkText: 'share',
    },
  ],
  disclaimer: { text: 'This site is not affiliated with Mastodon 9GMBH.' },
};
