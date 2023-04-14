import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function FollowSuggestions() {
  const router = useRouter();

  // Suggested users to follow on signup success. Add more if you want!
  const suggestedUsers = [
    {
      id: '13179',
      username: 'Mastodon',
      url: 'https://mastodon.social/@Mastodon',
    },
    { id: '1', username: 'Gargron', url: 'https://mastodon.social/@Gargron' },
    {
      id: '109373774912342849',
      username: 'wonderofscience',
      url: 'https://mastodon.social/@wonderofscience',
    },
  ];

  const followUser = async (targetAccountId, username) => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
      await axios.post('/api/follow', {
        accessToken,
        targetAccountId,
      });

      // @TODO: This message is still displaying success even if the user isn't
      // authenticated and follow fails. The user needs to be authenticated for
      // the follow to work.
      alert(`You are now following ${username}`);
    } catch (error) {
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    }
  };

  return (
    <div>
      <h1>Follow Suggestions</h1>
      <p>
        Please check your email and click the confirmation link. Once confirmed,
        click the button below and log in to authenticate and view suggested
        users to follow.
      </p>
      {/* Render the suggested users list */}
      <div>
        <h2>Suggested Users</h2>
        <ul>
          {suggestedUsers.map((user) => (
            <li key={user.id}>
              <a href={user.url} target="_blank" rel="noopener noreferrer">
                {user.username}
              </a>{' '}
              <button onClick={() => followUser(user.id, user.username)}>
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => router.push('/follow-tags')}>Follow Tags</button>
      <button onClick={() => router.push('/')}>Back to Signup</button>
    </div>
  );
}
