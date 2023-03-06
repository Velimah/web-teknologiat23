const search = (finnish, event) => {
  //check for 'enter' press to start search
  if (event.key === "Enter") {
    event.preventDefault();

    const inputValue = document.getElementById("search-input").value;
    const elements = document.querySelectorAll('.course-name');

    //index for number of results
    let i = 0;

    // loops all the course-name elements
    for (let elem of elements) {

      elem.style.backgroundColor = 'var(--main-color-white)';
      elem.style.color = 'var(--main-color-black)';
      elem.style.borderRadius = '0';
      elem.style.padding = '0';
      elem.style.marginTop = '0';
      elem.style.marginBottom = '0';
      elem.style.fontSize='0.9rem';

      //changes the course name appearance if it matches the search string
      if (elem.textContent.toLowerCase().includes(inputValue.toLowerCase())) {
        elem.style.backgroundColor = 'var(--main-color-red)';
        elem.style.color = '#FFFFFF';
        elem.style.borderRadius = '5px';
        elem.style.padding = '5px';
        elem.style.marginTop = '5px';
        elem.style.marginBottom = '5px';
        elem.style.fontSize='1rem';
        i++;
      }
    }
    //checks for language for correct alert
    if (finnish === true) {
      alert(`Löytyi ${i} annosta.`);
    } else {
      alert(`Found ${i} dishes.`);
    }
  }
};

export {search};
