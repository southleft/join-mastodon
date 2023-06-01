import React, { useEffect } from 'react';
import axios from 'axios';

const AuthPage = () => {
  useEffect(() => {
    const fetchAuthorizationUrl = async () => {
      try {
        const response = await axios.post('/api/getAuthUrl', {
          serverName: 'Spread Mastodon Social',
          redirectUri: 'http://localhost:3000/finish-auth',
        });

        const { authorizationUrl } = response.data;

        // Redirect the user to the authorization URL
        window.location.href = authorizationUrl;
      } catch (error) {
        console.log('Error: ', error);
        // Handle error
      }
    };

    fetchAuthorizationUrl();
  }, []);

  return (
    <div>
      <p>Redirecting to authorization screen...</p>
    </div>
  );
};

export default AuthPage;
