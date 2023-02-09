const dark = () => {
  document.documentElement.style.setProperty('--main-color-white', '#000000');
  document.documentElement.style.setProperty('--main-color-black', '#FFFFFF');
  document.documentElement.style.setProperty('--main-color-green', '#940E3F');
  document.documentElement.style.setProperty('--supp-color-lgreen', '#D03970');
  document.documentElement.style.setProperty('--main-color-blue', '#343A40');
  document.documentElement.style.setProperty('--main-color-red', '#D03970');
};
const light = () => {
  document.documentElement.style.setProperty('--main-color-white', '#FFFFFF');
  document.documentElement.style.setProperty('--main-color-black', '#000000');
  document.documentElement.style.setProperty('--main-color-green', '#43E04F');
  document.documentElement.style.setProperty('--supp-color-lgreen', '#65FF71');
  document.documentElement.style.setProperty('--main-color-blue', '#9BADBF');
  document.documentElement.style.setProperty('--main-color-red', '#E0437C');
};

export {dark,light};
