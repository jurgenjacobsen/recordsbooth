import axios from 'axios';

export { GetTopAlbums };

async function GetTopAlbums(
  user: string,
  period: string,
  sk: string,
  api_key: string,
  limit?: number,
) {
  if (!user || !period || !api_key) throw new Error('Missing required parameters');

  let resposne = await axios.get('http://ws.audioscrobbler.com/2.0/', {
    params: {
      method: 'user.getTopAlbums',
      user,
      period,
      api_key,
      sk,
      format: 'json',
      limit: limit || 50,
    },
  });

  if (!resposne.data) throw new Error('Failed to fetch data from Last.fm');

  return resposne.data;
}
