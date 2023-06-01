import axios from 'axios';

export default async function getToken(req, res) {
  const { code } = req.body;

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
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token } = response.data;
    console.log('🔥 access_token', access_token);

    res.status(200).json({ success: true, access_token });
  } catch (error) {
    console.error('Access token request failed:', error.response.data);
    res
      .status(500)
      .json({ success: false, error: 'Failed to obtain access token' });
  }
}
