/**
 * changes colors and metropolia logo depending on light/dark mode
 */
const darkTheme = () => {
  document.documentElement.style.setProperty('--main-color-white', '#000000');
  document.documentElement.style.setProperty('--main-color-black', '#cecece');
  document.documentElement.style.setProperty('--main-color-teal', '#000000');

  document.getElementById('header-picture2').setAttribute("src", "assets/Images/metropolia_s_musta.png");
};
const lightTheme = () => {
  document.documentElement.style.setProperty('--main-color-white', '#FFFFFF');
  document.documentElement.style.setProperty('--main-color-black', '#000000');
  document.documentElement.style.setProperty('--main-color-teal', '#5db1e4');

  document.getElementById('header-picture2').setAttribute("src", "assets/Images/metropolia_s_valkoinen.png");
};

export {darkTheme, lightTheme};
