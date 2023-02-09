const mouseParallax = (evt) => {
  let mouseX = evt.clientX;
  let mouseY = evt.clientY;

  let cx = window.innerWidth / 2;
  let cy = window.innerHeight / 2;

  let fromCenterX = cx - mouseX;
  let fromCenterY = cy - mouseY;

  const layerOne = document.querySelector('.picture-text');
  layerOne.style.transform = 'translateX(' + fromCenterX / 200 + '%) translateY(' + fromCenterY / 200 + '%)';
};

export {mouseParallax};
