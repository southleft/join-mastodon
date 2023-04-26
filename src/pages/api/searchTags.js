import axios from 'axios';

export default async function searchAccounts(req, res) {
  console.log('MASTODON_INSTANCE_URL:', process.env.MASTODON_INSTANCE_URL);
  const { tagName } = req.query;

  try {
    const response = await axios.get(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/tags/search?q=${tagName}`,
      // `${process.env.MASTODON_INSTANCE_URL}/api/v1/admin/trends/tags`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
        },
      },
    );

    console.log('yay');
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log('uh oh');
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
}
