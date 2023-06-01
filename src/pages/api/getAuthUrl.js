import axios from 'axios';

export default async function authApp(req, res) {
  const { serverName, redirectUri } = req.body;

  try {
    const appRegistrationResponse = await axios.post(
      `https://mastodon.social/api/v1/apps`,
      {
        redirect_uris: redirectUri,
        client_name: serverName,
      }
    );

    const { client_id, redirect_uri } = appRegistrationResponse.data;

    const authorizationUrl = `https://mastodon.social/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

    res.json({ authorizationUrl });
  } catch (error) {
    console.log('Error: ', error);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
