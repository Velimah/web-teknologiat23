import {doFetch} from "./network";

let campuses =
  [
    {
      name: 'Myyrmaki',
      id: 152,
      type: 'sodexo',
      lon: '24.844454601853037',
      lat: '60.258748360347994',
    },
    {
      name: 'Karamalmi',
      id: 3208,
      type: 'fazer',
      lon: '24.758666255819254',
      lat: '60.22419827645741',
    },
    {
      name: 'Myllypuro',
      id: 158,
      type: 'sodexo',
      lon: '25.0779246',
      lat: '60.223573821912986',
    },
    {
      name: 'Arabia',
      id: 1251,
      type: 'fazer',
      lon: '24.97673291349155',
      lat: '60.21003284593111',
    },
  ];

let myyrmakiSettings;
let karamalmiSettings;
let myllypuroSettings;
let arabiaSettings;
const getCampusSettings = async () => {
  try {
    campuses = await doFetch(
      `https://users.metropolia.fi/~velimah/settings`,
      true,
    );
    console.log('asetukset', campuses);
    myyrmakiSettings = campuses[0];
    karamalmiSettings = campuses[1];
    myllypuroSettings = campuses[2];
    arabiaSettings = campuses[3];
  } catch (error) {
    console.log('could not fetch capus settings');
    setTimeout(() => getCampusSettings(), 5000);
  }
};


export {myyrmakiSettings, karamalmiSettings, myllypuroSettings, arabiaSettings, campuses, getCampusSettings};
