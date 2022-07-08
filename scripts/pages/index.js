async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
};

const getPhotographers = fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((value) => {
    return value.photographers;
  });

const init = async () => {
  const photographers = await getPhotographers;
  displayData(photographers);
};

init();