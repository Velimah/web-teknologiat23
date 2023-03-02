const axios = require("axios");
let accessToken;
let optionsFetchBTC;

const optionsToken = {
  method: 'POST',
  url: 'https://bravenewcoin.p.rapidapi.com/oauth/token',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '0bf430eee7msh6afb2f0a00b6889p1d5649jsn4e8d832a064a',
    'X-RapidAPI-Host': 'bravenewcoin.p.rapidapi.com'
  },
  data: '{"audience":"https://api.bravenewcoin.com","client_id":"oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY","grant_type":"client_credentials"}'
};

const getBitcoinData = () => {
  axios.request(optionsToken)
    .then(function (response) {
      accessToken = response.data.access_token;
      optionsFetchBTC = {
        method: 'GET',
        url: 'https://bravenewcoin.p.rapidapi.com/market-cap',
        params: {assetId: 'f1ff77b6-3ab4-4719-9ded-2fc7e71cff1f'},
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-RapidAPI-Key': '0bf430eee7msh6afb2f0a00b6889p1d5649jsn4e8d832a064a',
          'X-RapidAPI-Host': 'bravenewcoin.p.rapidapi.com'
        }
      };
      return axios.request(optionsFetchBTC); // make the GET request here
    })
    .then(function (response) {
      console.log('btctesti', response.data);

      const time = new Date(response.data.content[0].timestamp).toTimeString().substring(0,18);
      const timestamp = document.createElement('div');
      timestamp.setAttribute('class', 'timestamp');
      timestamp.innerHTML = `${time}`;
      document.getElementById('btc').append(timestamp);

      const price = document.createElement('div');
      price.setAttribute('class', 'price');
      price.innerHTML = `Price $${Math.round(response.data.content[0].price)}`;
      document.getElementById('btc').append(price);

      const volume = document.createElement('div');
      volume.setAttribute('class', 'volume');
      volume.innerHTML = `Volume ${Math.round(response.data.content[0].volume)}`;
      document.getElementById('btc').append(volume);

      const marketCap = document.createElement('div');
      marketCap.setAttribute('class', 'marketCap');
      marketCap.innerHTML = `Market Cap $${Math.round(response.data.content[0].marketCap/1000/1000/1000)} Billion`;
      document.getElementById('btc').append(marketCap);

    })
    .catch(function (error) {
      console.log(error);
      console.log('bitcoin data ei saatavilla');
    });
};

getBitcoinData();
