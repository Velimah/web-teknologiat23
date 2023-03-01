import {doFetch} from './network';

let sodexoDataMyyrmaki;
let sodexoDataMyllypuro;
let fazerDataFiKaramalmi;
let fazerDataEnKaramalmi;
let fazerDataFiArabia;
let fazerDataEnArabia;

const loadMenus = async () => {
  /*
    if (type === 'sodexo') {
      try {
        sodexoData = await doFetch(
          `https://www.sodexo.fi/ruokalistat/output/weekly_json/${id}`,
          false,
        );
        console.log('sodexo menu', sodexoData);
      } catch (error) {
        console.log('menu ei saatavilla');
      }
    } else if (type === 'fazer') {
      try {
        fazerDataFi = await doFetch(
          `https://www.compass-group.fi/menuapi/feed/json?costNumber=${id}&language=fi`,
          true,
        );
        console.log('foodco menu finnish', fazerDataFi);
      } catch (error) {
        console.log('menu ei saatavilla');
      }
      try {
        fazerDataEn = await doFetch(
          `https://www.compass-group.fi/menuapi/feed/json?costNumber=${id}&language=en`,
          true,
        );
        console.log('foodco menu finnish', fazerDataFi);
      } catch (error) {
        console.log('menu ei saatavilla');
      }
    }
  */

  // fetches sodexo myllypuro menu
  try {
    sodexoDataMyyrmaki = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/158',
      false,
    );
    console.log('sodexo menu', sodexoDataMyllypuro);
  } catch (error) {
    console.log('menu ei saatavilla');
  }
  // fetches sodexo myyrmaki menu
  try {
    sodexoDataMyyrmaki = await doFetch(
      'https://www.sodexo.fi/ruokalistat/output/weekly_json/152',
      false,
    );
    console.log('sodexo menu', sodexoDataMyyrmaki);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches finnish foodco arabia menu
  try {
    fazerDataFiKaramalmi = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=1251&language=fi',
      true,
    );
    console.log('foodco menu finnish', fazerDataFiArabia);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches english foodco arabia menu
  try {
    fazerDataEnKaramalmi = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=1251&language=en',
      true,
    );
    console.log('foodco menu english', fazerDataEnArabia);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches finnish foodco karamalmi menu
  try {
    fazerDataFiKaramalmi = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=fi',
      true,
    );
    console.log('foodco menu finnish', fazerDataFiKaramalmi);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches english foodco karamalmi menu
  try {
    fazerDataEnKaramalmi = await doFetch(
      'https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=en',
      true,
    );
    console.log('foodco menu english', fazerDataEnKaramalmi);
  } catch (error) {
    console.log('menu ei saatavilla');
  }
};

export {sodexoDataMyyrmaki, sodexoDataMyllypuro, fazerDataFiKaramalmi, fazerDataEnKaramalmi, fazerDataFiArabia, fazerDataEnArabia, loadMenus};
