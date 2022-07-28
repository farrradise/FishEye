import MediaFactory from '../factories/MediasFactory.js'
import Header from '../views/photograph/Header.js'
import Recap from '../views/photograph/Recap.js'
import Card from '../views/media/Card.js'
import Filter from '../views/Filter.js'
import {closeModal, displayModal, checkDatas} from '../utils/contactForm.js'



const $main = document.querySelector("#main");
let photographerData;
let workData;


function getID() {
  let params = (new URL(document.location)).searchParams;
  return parseInt(params.get('id'));
}


async function displayHeader(photographerDatas) {
    const photograph = new Header(photographerDatas);
    const header = photograph.render();
    $main.innerHTML += header;


};


async function displayFilter() {
  const filter = new Filter();
  const $header = filter.render();
  $main.innerHTML += $header;

  // Pour ouvrir le dropdown filter
  const $triBtn = document.querySelector(".filter__choice");
  $triBtn.addEventListener("click", tri);
  // david smooth, attendre que tout soit prêt inserer un loader en attendant
};


async function displayWork(photographerWorks) {
  
  if (document.querySelector(".media")) {
    document.querySelector(".media").remove();
  }

  const $portfolio = document.createElement('div');
  $portfolio.setAttribute("class", "media");
  const works = photographerWorks.map(work => new MediaFactory(work));

  works.forEach(work => {
    const cardMedia = new Card(work)
    $portfolio.innerHTML += cardMedia.render();
    
  });
  

  $main.appendChild($portfolio)


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
  const isAlreadyLiked = $card.getAttribute('data-liked');
  const $recapLikes = document.querySelector(".recap__likes span");

  
  works.forEach(work => {
    if (work.id == $cardID) {
        
        if (isAlreadyLiked == "true") {
          work.likes = -1;
          $card.dataset.liked = "false"
          $recapLikes.textContent = parseInt($recapLikes.textContent) -1;
        } else {
          work.likes = 1;
          $card.dataset.liked = "true"
          $recapLikes.textContent = parseInt($recapLikes.textContent) + 1;
        }
            
        $heartNb.innerHTML = work.likes;
    }
  });
}


const start = async () => {
  photographerData = await getPhotographer;
  workData = await getWork;
  


  displayHeader(photographerData);
  displayRecap(photographerData, workData);
  displayFilter();
  displayWork(workData);


  // Events
  document.querySelector(".contact_button").addEventListener("click", () => displayModal());
  document.querySelector(".modal__closeBtn").addEventListener("click", () => closeModal());
  document.querySelector ('.modal__submit').addEventListener("click", (e) => checkDatas(e));


};

function tri(e) {


  document.querySelector('.filter__options').classList.toggle("open");
  document.querySelector('.filter__button').classList.toggle("open");
  
  const triOption = e.target.dataset.value;


  switch (triOption) {

    case "likes":
      workData.sort(function (a, b) {
        return b.likes - a.likes;
      });
      displayWork(workData);
      break;

    case "date":
      workData.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      displayWork(workData);
      break;

    case "title":
      workData.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      displayWork(workData);
      break;

    // default: 
  }

  if   (e.target.textContent != "") {
    document.querySelector("#tri span").innerHTML = e.target.textContent;
  } 
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







start();

