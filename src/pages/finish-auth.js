import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@/components/Organism/Card';

const FinishAuth = () => {
  const router = useRouter();
  const [storedAccessToken, setStoredAccessToken] = useState('');
  const [user, setUser] = useState();
  const { code } = router.query;

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post(
          'https://mastodon.social/oauth/token',
          {
            client_id: 'NRQIMMaWJPxCsFD6jZRSO-md9tb8VN8T6yKqJMhdcs4',
            client_secret: 'w6VJzI-myOqf0oxDcdcEU58v26XMh4NKp2deQPTqcWA',
            redirect_uri: 'http://localhost:3000/finish-auth',
            grant_type: 'authorization_code',
            code: code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        console.log('🔥 response', response);

        // const { access_token } = response.data;
        // setStoredAccessToken(access_token);

        // return access_token;
      } catch (error) {
        console.log('Error getToken: ', error.response.data);
      }
    };
    getToken();
  }, [code]);

  return <div></div>;
};

export default FinishAuth;
