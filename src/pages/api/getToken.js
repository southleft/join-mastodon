import axios from 'axios';

export default async function getToken(req, res) {
  const { code } = req.body;
  console.log('🔥 does this code exist?', code);

  try {
    // const client_id = 'NRQIMMaWJPxCsFD6jZRSO-md9tb8VN8T6yKqJMhdcs4';
    // const client_secret = 'w6VJzI-myOqf0oxDcdcEU58v26XMh4NKp2deQPTqcWA';
    // const redirect_uri =
    //   process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:3000/finish-auth'
    //     : 'https://join-mastodon-poc.vercel.app/finish-auth';
    // const grant_type = 'authorization_code';

    const client_id = 'NRQIMMaWJPxCsFD6jZRSO-md9tb8VN8T6yKqJMhdcs4';
    const client_secret = 'w6VJzI-myOqf0oxDcdcEU58v26XMh4NKp2deQPTqcWA';
    const redirect_uri = 'urn:ietf:wg:oauth:2.0:oob';
    const grant_type = 'authorization_code';

    const response = await axios.post(
      'https://mastodon.social/oauth/token',
      {
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
        code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token } = response.data;
    res.status(200).json({ success: true, access_token });
  } catch (error) {
    console.error('Access token request failed:', error.response.data);
    res
      .status(500)
      .json({ success: false, error: 'Failed to obtain access token' });
  }
}
