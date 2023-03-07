import {doFetch} from './network';
import {myyrmakiSettings, karamalmiSettings, myllypuroSettings, arabiaSettings} from "./campus-settings";

let sodexoDataMyyrmaki;
let sodexoDataMyllypuro;
let fazerDataFiKaramalmi;
let fazerDataEnKaramalmi;
let fazerDataFiArabia;
let fazerDataEnArabia;


/**
 * fetches all lunch menus. done in different functions to be able to re-fetch each menu individually with catch.
 * @returns {Promise<void>}
 */
const getLunchMenus = async () => {
  await getSodexoMyllypuroMenu();
  await getSodexoMyyrmakiMenu();
  await getFazerKaramalmiMenuFi();
  await getFazerKaramalmiMenuEn();
  await getFazerArabiaMenuFi();
  await getFazerArabiaMenuEn();
};

// fetches sodexo myllypuro menu
const getSodexoMyllypuroMenu = async () => {
  // fetches sodexo myllypuro menu
  try {
    sodexoDataMyllypuro = await doFetch(
      `https://www.sodexo.fi/ruokalistat/output/weekly_json/${myllypuroSettings.id}`,
      false,
    );
    console.log('sodexo menu myllypuro', sodexoDataMyllypuro);
  } catch (error) {
    console.log('menu ei saatavilla');
    setTimeout(() => getSodexoMyllypuroMenu(), 5000);
  }
};

// fetches sodexo myyrmaki menu
const getSodexoMyyrmakiMenu = async () => {
  try {
    sodexoDataMyyrmaki = await doFetch(
      `https://www.sodexo.fi/ruokalistat/output/weekly_json/${myyrmakiSettings.id}`,
      false,
    );
    console.log('sodexo menu myyrmaki', sodexoDataMyyrmaki);
  } catch (error) {
    console.log('menu ei saatavilla');
    setTimeout(() => getSodexoMyyrmakiMenu(), 5000);
  }
};

// fetches finnish foodco arabia menu
const getFazerArabiaMenuFi = async () => {
  try {
    fazerDataFiArabia = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${arabiaSettings.id}&language=fi`,
      true,
    );
    console.log('foodco menu arabia finnish', fazerDataFiArabia);
  } catch (error) {
    console.log('menu ei saatavilla');
    setTimeout(() => getFazerArabiaMenuFi(), 5000);
  }
};

// fetches english foodco arabia menu
const getFazerArabiaMenuEn = async () => {
  try {
    fazerDataEnArabia = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${arabiaSettings.id}&language=en`,
      true,
    );
    console.log('foodco menu arabia english', fazerDataEnArabia);
  } catch (error) {
    console.log('menu ei saatavilla');
    setTimeout(() => getFazerArabiaMenuEn(), 5000);
  }
};

// fetches finnish foodco karamalmi menu
const getFazerKaramalmiMenuFi = async () => {
  try {
    fazerDataFiKaramalmi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${karamalmiSettings.id}&language=fi`,
      true,
    );
    console.log('foodco menu karamalmi finnish', fazerDataFiKaramalmi);
  } catch (error) {
    console.log('menu ei saatavilla');
    setTimeout(() => getFazerKaramalmiMenuFi(), 5000);
  }
};
// fetches english foodco karamalmi menu
const getFazerKaramalmiMenuEn = async () => {
  try {
    fazerDataEnKaramalmi = await doFetch(
      `https://www.compass-group.fi/menuapi/feed/json?costNumber=${karamalmiSettings.id}&language=en`,
      true,
    );
    console.log('foodco menu karamalmi english', fazerDataEnKaramalmi);
  } catch (error) {
    console.log('menu ei saatavilla');
    setTimeout(() => getFazerKaramalmiMenuEn(), 5000);
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
