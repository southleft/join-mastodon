import axios from 'axios';

export default async function authApp(req, res) {
  console.log('MASTODON_INSTANCE_URL:', process.env.MASTODON_INSTANCE);

  const { tagName } = req.query;
  console.log("RES ==============", res)
  try {
    const response = await axios.get(
      `${process.env.MASTODON_INSTANCE_URL}/oauth/authorize`,
      {
        response_type: 'code',
        client_id: '@gsarault44@mastodon.world',
        redirect_uri: 'http://localhost:3000/enhance-account'
      }
    );
      console.log("RESPONSE ==============",response)
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('Error =============',error)
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
