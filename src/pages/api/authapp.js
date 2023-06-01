import axios from 'axios';

export default async function authApp(req, res) {
  console.log('🔥 req.body', req.body);

  const { serverName, redirect_uri } = req.body;

  try {
    const appRegistrationResponse = await axios.post(
      `https://mastodon.social/api/v1/apps`,
      {
        redirect_uris: redirect_uri,
        client_name: serverName,
      }
    );

    console.log(
      '🔥 appRegistrationResponse.data',
      appRegistrationResponse.data
    );

    const { client_id } = appRegistrationResponse.data;

    const authorizationUrl = `https://mastodon.social/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=read+write+follow`;

    res.json({ authorizationUrl });
  } catch (error) {
    console.log('Error: ', error);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
