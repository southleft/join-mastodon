import axios from 'axios';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 15,
});

export default async function getFollowAccountId(req, res) {
  const { accessToken, targetAccountUser, searchUrl, server } = req.body;
  
  console.log('🔥 accessToken', accessToken);
  console.log('🔥 targetAccountUser', targetAccountUser);
  console.log('🔥 accountUrl', searchUrl);
  console.log('🔥 server', server);


  try {
    const response = await limiter.schedule(() =>
      axios.get(
        `https://${server}/api/v2/search?q=${targetAccountUser}&type=accounts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    );

    res.status(200).json({ success: true, data: response.data });
    // TODO: Filter results based on accountUrl
    console.log("🔥 Search Data: ", response.data.accounts);
  } catch (error) {
    console.log('❌ Error on follow: ', error.response.data);

    res.status(400).json({ success: false, error: error.response.data });
  }
}