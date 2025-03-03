import axios from 'axios';

export { FetchUser, KeepAlive };

async function FetchUser(
  method: 'topAlbums' | 'topArtists' | 'topSongs',
  user: string,
  period: string,
  sk: string,
  api_key: string,
  limit?: number,
) {
  if (!user || !period || !api_key) throw new Error('Missing required parameters');

  let met =
    method === 'topAlbums'
      ? 'user.getTopAlbums'
      : method === 'topArtists'
        ? 'user.getTopArtists'
        : 'user.getTopTracks';

  let response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
    params: {
      method: met,
      user,
      period,
      api_key,
      sk,
      format: 'json',
      limit: limit || 50,
    },
  });

  if (!response.data) throw new Error('Failed to fetch data from Last.fm');

  return response.data;
}

function KeepAlive(timeIntervalMin: number, error?: boolean) {
  if (!timeIntervalMin) throw new Error('Missing required parameters');
  let time = timeIntervalMin * 60 * 1000;
  if (!error) {
    setInterval(() => {
      axios
        .get('https://recordsbooth.onrender.com/')
        .then(() => console.log('Kept alive'))
        .catch(() => {
          KeepAlive(timeIntervalMin, true);
        });
    }, time);
  } else {
    axios
      .get('https://recordsbooth.onrender.com/')
      .then(() => console.log('Kept alive'))
      .catch(() => console.log('Failed to keep alive'));
  }
}
