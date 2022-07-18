import Header from '../views/photograph/Header.js'
import {closeModal, displayModal} from '../utils/contactForm.js'

const main = document.querySelector("#main");


function getID() {
  let params = (new URL(document.location)).searchParams;
  return parseInt(params.get('id'));
}



async function displayHeader(photographerDatas) {
  console.log(photographerDatas);

    const photograph = new Header(photographerDatas);
    const header = photograph.render();
    main.innerHTML += header;


};



async function displayWork(photographerWorks) {
  photographerWorks.forEach((media) => {
    console.log(media);
    main.innerHTML += media.title + " <br>";
  });

}



const getPhotographer = fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((value) => {
    const selectedPhotographer = value.photographers.filter(photographer => photographer.id == getID()); 
    return selectedPhotographer[0];
  });


const getWork = fetch("./data/photographers.json")
.then((response) => response.json())
.then((value) => {
  return value.media.filter(singleMedia => singleMedia.photographerId == getID());
});




const start = async () => {
  const photographerData = await getPhotographer;
  const workData = await getWork;


  displayHeader(photographerData);
  displayWork(workData);
};

start();
