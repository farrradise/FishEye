// import photographerFactory from '..factories/photographer.js';

async function displayData(photographersData) {

    const photographersSection = document.querySelector(".photographer_section");
    photographersData.forEach((photographerData) => {

        // const photographerModel = photographerView(photographerData);
                
        const photographerModel = new PhotographerCard(photographerData);

        // const userCardDOM = photographerModel.getUserCardDOM();
        const userCardDOM = photographerModel.photographerTemplate();


        photographersSection.innerHTML += userCardDOM;
    });
};



const getPhotographers = fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((value) => {
    return value.photographers;
  });




const init = async () => {
  const photographersData = await getPhotographers;
  displayData(photographersData);
};

init();





