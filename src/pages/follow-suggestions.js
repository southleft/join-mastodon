import { useEffect, useState } from 'react';
import Bottleneck from 'bottleneck';
import Head from 'next/head';
import axios from 'axios';
import Button from '@/components/atoms/Button';
import StepperHeader from '@/components/molecules/StepperHeader';
import Logo from '@/components/atoms/Logo';
import ToolTip from '@/components/Organism/ToolTip';
import Grid from '@/components/layout/Grid';
import Card from '@/components/Organism/Card';
import GridItem from '@/components/layout/GridItem';
import { followSuggestionsData as data } from '/data/followSuggestions';
import Checkbox from '@/components/atoms/checkbox';
import Modal from '@/components/Organism/Modal';
import Icon from '@/components/atoms/icon';
import Spinner from '@/components/atoms/Loader';
import { useRouter } from 'next/router';

export default function FollowSuggestions() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [followedUsers, setFollowedUsers] = useState();
  const [followedCatUsers, setFollowedCatUsers] = useState();
  const [followedAllUsersSuccess, setFollowedAllUsersSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [toggleValue, setToggleValue] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 333,
  });

  const getAccountID = async (username, url) => {
    const accessToken = window.sessionStorage.getItem('accessToken');
    const server = window.localStorage.getItem('client');

    try {
      const response = await axios.post('/api/searchAccounts', {
        searchTerm: username,
        accessToken,
        server,
      });
      const accounts = response.data.data;
      const account = accounts.filter((account) => account.url === url);
      return account[0].id;
    } catch (error) {
      setErrorMessage(error.response);
    }
  };

  const followAllCategoryUsers = async () => {
    const accessToken = window.sessionStorage.getItem('accessToken');
    const server = localStorage.getItem('client');

    if (checkedCategories.length === 0) {
      setResponseMessage('Please select at least one category');
      setToggleValue(true);
      setFollowedCatUsers('');
      return;
    }
    setLoading(true);
    setErrorMessage(``);
    try {
      const followPromises = data.suggestedUsers
        .filter((category) => checkedCategories.includes(category.title))
        .map(async (category) => {
          const categoryFollowPromises = category.accounts.map(async (user) => {
            try {
              const userID = await getAccountID(user.username, user.url);

              const response = await limiter.schedule(() =>
                axios.post('/api/follow', {
                  accessToken,
                  targetAccountId: userID,
                  server,
                }),
              );

              return user.username;
            } catch (error) {
              setErrorMessage(`Error following user ${user.username}`);
              return { status: 'rejected', reason: error };
            }
          });

          return Promise.allSettled(categoryFollowPromises);
        });

      const followedUsernames = await Promise.all(followPromises);
      const updatedFollowedUsernames = followedUsernames
        .flat()
        .map((result) => {
          if (result.status === 'fulfilled') {
            return result.value;
          } else if (result.status === 'rejected') {
            return;
          }
        });

      setFollowedCatUsers(updatedFollowedUsernames.flat().join(', '));
    } catch (error) {
      setErrorMessage(error.response);
    }
    setToggleValue(true);
    setLoading(false);
  };

  // This function is called whenever a checkbox is changed
  const handleCheckboxChange = (event) => {
    // Destructure the name and checked properties from the event target
    const { name, checked } = event.target;
    setIsChecked([...isChecked, name]);
    if (!checked) {
      setIsChecked(isChecked.filter((item) => item !== name));
    }
    // Update the checkedCategories state based on the checkbox change
    setCheckedCategories((prevCategories) => {
      // Make a copy of the previous categories array
      const updatedCategories = [...prevCategories];

      // Check if the category is already in the array
      const categoryIndex = updatedCategories.indexOf(name);

      // If the checkbox is checked and the category isn't in the array, add it
      if (checked && categoryIndex === -1) {
        updatedCategories.push(name);
      }
      // If the checkbox is unchecked and the category is in the array, remove it
      else if (!checked && categoryIndex !== -1) {
        updatedCategories.splice(categoryIndex, 1);
      }

      setToggleValue(false);

      // Return the updated categories array
      return updatedCategories;
    });

    // Stop the event from propagating further
    event.stopPropagation();
  };

  const handleSelectAll = () => {
    const categories = data.suggestedUsers.map((category) => category.title);
    setCheckedCategories(categories);
    setIsChecked(categories);
  };

  // Get the access token from session storage on component mount
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setHasAccessToken(true);
    }
  }, []);

  return (
    <div className="content-wrapper">
      <Head>
        <title>Spread Mastodon - {data.metaData.title}</title>
        <meta name={data.metaData.name} content={data.metaData.description} />
        <meta property="og:title" content={data.metaData.name} />
        <meta property="og:description" content={data.metaData.description} />
        <meta property="og:url" content={router.pathname} />
        <meta name="twitter:title" content={data.metaData.name} />
        <meta name="twitter:description" content={data.metaData.description} />
      </Head>
      <Logo />
      <main className="l-main c-page__interior">
        <div className="u-text-align--center">
          <StepperHeader
            iconName="enrich"
            iconWidth="75"
            iconHeight="83"
            heading={data.heading.text}
            subHeading={data.subHeading.text}
          />
          <h2 className="u-heading--2xl">{data.secondHeading.text}</h2>
          <div className="u-heading--xl u-margin-bottom--lg">
            <ToolTip
              iconWidth={24}
              iconHeight={24}
              label={data.toolTip.label}
              value={data.toolTip.value}
            />{' '}
            <span>{data.textCTA.text}</span>
          </div>
          <p className="c-follow-category__info u-body--lg">
            {data.explainerText}
          </p>
          <Grid className="u-margin-bottom--lg">
            <GridItem columnStart={5} columnEnd={9}>
              {!hasAccessToken ? (
                <div>
                  <Button
                    text="Sign In"
                    loading={loading}
                    className="u-margin-bottom--md"
                    variant="secondary"
                    link="enhance-account"
                  />
                </div>
              ) : (
                !followedAllUsersSuccess && (
                  <Button
                    onClick={handleSelectAll}
                    text={data.followAllButton.text}
                    loading={loading}
                    className="u-margin-bottom--md"
                    variant="secondary"
                  />
                )
              )}
            </GridItem>
          </Grid>
        </div>
        {/* Render the suggested users list */}
        {hasAccessToken && (
          <div className="u-margin-bottom--2xl">
            {loading === true ? (
              <Grid>
                <GridItem>
                  <Card variant="basic">
                    <div className="c-follow-category">
                      <div className="c-follow-category--content">
                        <Spinner />
                        <p>{data.loadingExplainerText}</p>
                      </div>
                    </div>
                  </Card>
                </GridItem>
              </Grid>
            ) : (
              <>
                <Grid
                  className="u-margin-bottom--xl"
                  variant="autoFit"
                  itemMinWidth="lg">
                  {followedAllUsersSuccess ? (
                    <div>
                      <p>{data.followAllSuccess.text}</p>
                      <p>{followedUsers}</p>
                    </div>
                  ) : (
                    <>
                      {data.suggestedUsers.map((category, i) => {
                        return (
                          <Card
                            className={`c-follow-category__card`}
                            active={isChecked.includes(category.title)}
                            key={category.title + i}
                            variant="basic">
                            {category.icon && (
                              <Icon
                                width={28}
                                height={28}
                                iconName={category.icon}
                              />
                            )}
                            <div className="c-follow-category">
                              <div className="c-follow-category--content">
                                <p>{category.title}</p>
                                {loading === false ? (
                                  <ToolTip
                                    label={`${category.accounts.length} accounts`}
                                    value={
                                      <div>
                                        <p>{data.categoryTooltip.text}</p>
                                        <ul className="c-follow-category__tool-tip">
                                          {category.accounts.map((user, i) => (
                                            <li key={user.id}>
                                              {user.username}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    }
                                    iconWidth={18}
                                    iconHeight={18}
                                  />
                                ) : (
                                  <p>...loading</p>
                                )}
                              </div>
                              <Checkbox
                                checked={isChecked.includes(category.title)}
                                onChange={handleCheckboxChange}
                                value={category.title}
                                name={category.title}
                              />
                            </div>
                          </Card>
                        );
                      })}
                    </>
                  )}
                </Grid>
                <Modal toggleValue={toggleValue}>
                  <h4>
                    {responseMessage ? (
                      <span>{responseMessage}</span>
                    ) : (
                      <span>You are now following:</span>
                    )}
                  </h4>
                  {followedCatUsers && <p>{followedCatUsers}</p>}
                  {errorMessage && <p className="c-error">{errorMessage}</p>}
                </Modal>
                <Button
                  className={
                    followedAllUsersSuccess
                      ? 'u-display--none'
                      : 'c-follow-category__follow-selected'
                  }
                  text={data.followSelectedCategoriesButton.text}
                  onClick={followAllCategoryUsers}
                  loading={loading}
                />
              </>
            )}
          </div>
        )}

        <Grid className="c-follow-category__button-row" variant="autoFit">
          <Button
            text={data.nextStepButton.text}
            link={data.nextStepButton.link}
          />
          <Button
            link={data.skipButton.link}
            text={data.skipButton.text}
            variant="secondary"
          />
        </Grid>
      </main>
    </div>
  );
}
