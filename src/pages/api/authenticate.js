import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, clientId, clientSecret, serverName } = req.body;

    // const instanceUrl = process.env.MASTODON_INSTANCE_URL;
    // const clientId = process.env.MASTODON_CLIENT_ID;
    // const clientSecret = process.env.MASTODON_CLIENT_SECRET;

    try {
      const response = await axios.post(`https://${serverName}/oauth/token`, {
        grant_type: 'password',
        username: email,
        password,
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'read write follow',
      });

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      res.status(400).json({ success: false, error: error.response.data });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
