import MediaFactory from '../factories/MediasFactory.js'
import Video from '../models/Video.js'
import Image from '../models/Image.js'
import Header from '../views/photograph/Header.js'
import Recap from '../views/photograph/Recap.js'
import Card from '../views/media/Card.js'
import {closeModal, displayModal} from '../utils/contactForm.js'

const $main = document.querySelector("#main");


function getID() {
  let params = (new URL(document.location)).searchParams;
  return parseInt(params.get('id'));
}



async function displayHeader(photographerDatas) {
    const photograph = new Header(photographerDatas);
    const header = photograph.render();
    $main.innerHTML += header;


};



async function displayWork(photographerWorks) {
  const portfolio = document.createElement('div');
  portfolio.setAttribute("class", "media");
  const works = photographerWorks.map(work => new MediaFactory(work));

  works.forEach(work => {
    const cardMedia = new Card(work)
    portfolio.innerHTML += cardMedia.render();
    
  });
  

  $main.appendChild(portfolio)
  const $hearts = document.querySelectorAll(".media__likes i");
  $hearts.forEach(heart => heart.addEventListener("click", e => addLike(e.target, works)));
    // David interessant fonction fléchée le this n'existe pas 
  // $hearts.forEach(heart => heart.addEventListener('click', addLike(heart)));
}


function displayRecap(photographerData, workData) {
  let likes = 0
  workData.forEach(singleWork => likes += singleWork.likes)
  const recap = new Recap(photographerData.price, likes);
  // console.log(recap.render);

  $main.innerHTML += recap.render();

}

function addLike($heart, works) {

  const $card = $heart.closest(".media__card");
  const $heartNb = $heart.previousElementSibling;
  const $cardID = $card.getAttribute('data-id');

  works.forEach(work => {
    if (work.id == $cardID) {
        work.likes = 1;
        // console.log("ça fait", work.likes);
        $heartNb.innerHTML = work.likes;
    }
  });
  // console.log($cardID);
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
  // console.log(value.media);
  return value.media.filter(singleMedia => singleMedia.photographerId == getID());
});




const start = async () => {
  const photographerData = await getPhotographer;
  const workData = await getWork;


  displayHeader(photographerData);
  displayRecap(photographerData, workData);
  displayWork(workData);
};

start();
