// import Photographer from '../views/Photographer.js'
// import Photograph from '../factories/Photograph.js'
import DB from "../db/Databas.js"
import Card from '../views/photograph/Card.js'

async function displayData(photographersData) {

    const photographersSection = document.querySelector(".photographer_section");

    photographersData.forEach((photographerData) => {

        const photographerModel = new Card(photographerData);
        const userCardDOM = photographerModel.render();
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




