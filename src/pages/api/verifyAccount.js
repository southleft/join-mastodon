import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { accessToken, server } = req.query;
    const instanceUrl = server;

    console.log('VerifyAccountAPI', accessToken);

    try {
      const response = await axios.get(
        `${instanceUrl}/api/v1/accounts/verify_credentials`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      res.status(400).json({ success: false, error: error.response.data });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
