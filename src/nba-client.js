import nba from 'nba';

const SERVER_URL = 'http://35.235.84.235:5000';

export default {
  ...nba,
  stats: {
    ...nba.stats,
    playerInfo: ({ PlayerID }) => {
      console.log('playerInfo:' + PlayerID);
      return fetch(`${SERVER_URL}/players/${PlayerID}`).then(res => res.json());
    },
    shots: ({ PlayerID }) => {
      console.log('shots:' + PlayerID);
      return fetch(`${SERVER_URL}/players/${PlayerID}/shots`).then(res =>
        res.json()
      );
    }
  }
};
