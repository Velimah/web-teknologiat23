import {doFetch} from './network';
import {myyrmakiSettings, karamalmiSettings, myllypuroSettings, arabiaSettings} from "./restaurant-settings";

let sodexoDataMyyrmaki;
let sodexoDataMyllypuro;
let fazerDataFiKaramalmi;
let fazerDataEnKaramalmi;
let fazerDataFiArabia;
let fazerDataEnArabia;

const getLunchMenus = async () => {
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
    sodexoDataMyllypuro = await doFetch(
      `https://www.sodexo.fi/ruokalistat/output/weekly_json/${myllypuroSettings.id}`,
      false,
    );
    console.log('sodexo menu myllypuro', sodexoDataMyllypuro);
  } catch (error) {
    console.log('menu ei saatavilla');
  }
  // fetches sodexo myyrmaki menu
  try {
    sodexoDataMyyrmaki = await doFetch(
      `https://www.sodexo.fi/ruokalistat/output/weekly_json/${myyrmakiSettings.id}`,
      false,
    );
    console.log('sodexo menu myyrmaki', sodexoDataMyyrmaki);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches finnish foodco arabia menu
  try {
    fazerDataFiArabia = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${arabiaSettings.id}&language=fi`,
      true,
    );
    console.log('foodco menu arabia finnish', fazerDataFiArabia);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches english foodco arabia menu
  try {
    fazerDataEnArabia = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${arabiaSettings.id}&language=en`,
      true,
    );
    console.log('foodco menu arabia english', fazerDataEnArabia);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches finnish foodco karamalmi menu
  try {
    fazerDataFiKaramalmi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${karamalmiSettings.id}&language=fi`,
      true,
    );
    console.log('foodco menu karamalmi finnish', fazerDataFiKaramalmi);
  } catch (error) {
    console.log('menu ei saatavilla');
  }

  // fetches english foodco karamalmi menu
  try {
    fazerDataEnKaramalmi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${karamalmiSettings.id}&language=en`,
      true,
    );
    console.log('foodco menu karamalmi english', fazerDataEnKaramalmi);
  } catch (error) {
    console.log('menu ei saatavilla');
  }
};

export {
  sodexoDataMyyrmaki,
  sodexoDataMyllypuro,
  fazerDataFiKaramalmi,
  fazerDataEnKaramalmi,
  fazerDataFiArabia,
  fazerDataEnArabia,
  getLunchMenus
};
