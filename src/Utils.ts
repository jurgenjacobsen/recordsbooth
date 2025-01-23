import axios from 'axios';

export { GetTopAlbums, KeepAlive };

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