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

/**
 * fetches bitcoin access token, then fetches bitcoin data and renders it.
 * @param finnish
 */
const getBitcoinData = (finnish) => {
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

      document.getElementById('btc').innerHTML = '';

      const name = document.createElement('div');
      name.setAttribute('id', 'btc-name');
      name.innerHTML = `Bitcoin`;
      document.getElementById('btc').append(name);

      const time = new Date(response.data.content[0].timestamp).toTimeString().substring(0, 18);
      const timestamp = document.createElement('div');
      timestamp.setAttribute('class', 'timestamp');
      timestamp.innerHTML = `${time}`;
      document.getElementById('btc').append(timestamp);

      const cellPrice = document.createElement('div');
      cellPrice.setAttribute('id', 'cell-1btc');
      document.getElementById('btc').append(cellPrice);

      const priceName = document.createElement('div');
      priceName.setAttribute('class', 'price-name');
      if (finnish === true) {
        priceName.innerHTML = `Hinta`;
      } else {
        priceName.innerHTML = `Price`;
      }
      document.getElementById('cell-1btc').append(priceName);

      const price = document.createElement('div');
      price.setAttribute('class', 'price');
      price.innerHTML = `$${Math.round(response.data.content[0].price)}`;
      document.getElementById('cell-1btc').append(price);

      const cellVolume = document.createElement('div');
      cellVolume.setAttribute('id', 'cell-2btc');
      document.getElementById('btc').append(cellVolume);

      const volumeName = document.createElement('div');
      volumeName.setAttribute('class', 'volume-name');
      if (finnish === true) {
        volumeName.innerHTML = `Volyymi`;
      } else {
        volumeName.innerHTML = `Volume`;
      }
      document.getElementById('cell-2btc').append(volumeName);

      const volume = document.createElement('div');
      volume.setAttribute('class', 'volume');
      volume.innerHTML = `${Math.round(response.data.content[0].volume)}`;
      document.getElementById('cell-2btc').append(volume);

      const cellMarketcap = document.createElement('div');
      cellMarketcap.setAttribute('id', 'cell-3btc');
      document.getElementById('btc').append(cellMarketcap);

      const marketcapName = document.createElement('div');
      marketcapName.setAttribute('class', 'volume-name');
      if (finnish === true) {
        marketcapName.innerHTML = `Markkina-arvo`;
      } else {
        marketcapName.innerHTML = `Market Cap`;
      }
      document.getElementById('cell-3btc').append(marketcapName);

      const marketCap = document.createElement('div');
      marketCap.setAttribute('class', 'volume');
      marketCap.innerHTML = `$${Math.round(response.data.content[0].marketCap / 1000 / 1000 / 1000)} bln`;
      document.getElementById('cell-3btc').append(marketCap);

    })
    .catch(function (error) {
      console.log(error);
      console.log('bitcoin data ei saatavilla');
    });
};

export {getBitcoinData};
