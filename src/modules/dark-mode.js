const darkTheme = () => {
  document.documentElement.style.setProperty('--main-color-white', '#000000');
  document.documentElement.style.setProperty('--main-color-black', '#FFFFFF');
  document.documentElement.style.setProperty('--main-color-orange', '#ff5000');
  document.documentElement.style.setProperty('--main-color-yellow', '#fff000');
  document.documentElement.style.setProperty('--main-color-blue', '#4046a8');
  document.documentElement.style.setProperty('--main-color-red', '#cb2228');
  document.getElementById('header-picture2').setAttribute("src", "assets/Images/metropolia_s_musta.png");
};
const lightTheme = () => {
  document.documentElement.style.setProperty('--main-color-white', '#FFFFFF');
  document.documentElement.style.setProperty('--main-color-black', '#000000');
  document.documentElement.style.setProperty('--main-color-orange', '#ff5000');
  document.documentElement.style.setProperty('--main-color-yellow', '#fff000');
  document.documentElement.style.setProperty('--main-color-blue', '#4046a8');
  document.documentElement.style.setProperty('--main-color-red', '#cb2228');
  document.getElementById('header-picture2').setAttribute("src", "assets/Images/metropolia_s_valkoinen.png");
};

export {darkTheme, lightTheme};
