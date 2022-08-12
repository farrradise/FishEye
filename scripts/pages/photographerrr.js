import Api from "../db/Database.js"
import MediaFactory from '../factories/MediasFactory.js'
import Header from '../views/photograph/Header.js'
import Recap from '../views/photograph/Recap.js'
import Card from '../views/media/Card.js'
import Filter from '../views/Filter.js'
import {closeModal, displayModal, checkDatas} from '../utils/contactForm.js'
import slider from '../utils/slider.js'



const $main = document.querySelector("#main");
let photographerData;
let workData;
let works;

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
};


async function displayWork(photographerWorks) {
  
  if (document.querySelector(".media")) {
    document.querySelector(".media").remove();
  }

  const $portfolio = document.createElement('div');
  $portfolio.setAttribute("class", "media");
  works = photographerWorks.map(work => new MediaFactory(work));

  works.forEach(work => {
    const cardMedia = new Card(work)
    $portfolio.innerHTML += cardMedia.render();
  
  });
  

  $main.appendChild($portfolio)
  if (document.querySelector("video.media__img")) {
     document.querySelector('video.media__img').removeAttribute('controls');
   }

  const $hearts = document.querySelectorAll(".media__likes i");
  const $medias = document.querySelectorAll('.media__link');
  
  $hearts.forEach(heart => heart.addEventListener("click", e => addLike(e.target, works)));
  $medias.forEach( media => media.addEventListener("click", e => slider(e, works)));



}


function diisplayRecap(photographerData, workData) {
  let likes = 0
  workData.forEach(singleWork => likes += singleWork.likes)
  const recap = new Recap(photographerData.price, likes);

  $main.innerHTML += recap.render();

}

function addLike($heart, works) {

  const $card = $heart.closest(".media__card");
  const $heartNb = $heart.previousElementSibling;
  const $cardID = $card.getAttribute('data-id');
  const $recapLikes = document.querySelector(".recap__likes span");
  const isAlreadyLiked = Boolean($card.getAttribute('data-liked') == "true");

  if (isAlreadyLiked) {
    $card.dataset.liked = "false"
    $recapLikes.textContent = parseInt($recapLikes.textContent) -1;
    $heartNb.innerHTML = parseInt($heartNb.textContent) -1;
  } else {
    $card.dataset.liked = "true"
    $recapLikes.textContent = parseInt($recapLikes.textContent) + 1;
    $heartNb.innerHTML = parseInt($heartNb.textContent) +1;
  }
   

}



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







class App {
  constructor() {
    this.$main = document.querySelector("#main");
    this._api = new Api("./data/photographers.json");
    this._id = parseInt((new URL(document.location)).searchParams.get('id')); 
    this._photographer;
    this._allMedias;
    this._datas;
    this._relatedMedias;
  }


  async start () {
    const datas = await this._api.get();
    this._datas = datas;
    this._allMedias = datas.media;   
    const photographerData = await this.getPhotographer();
    this._photographer = await this.getPhotographer()
    const relatedMedias = await this.getRelatedWork(); 

    
    console.log(photographerData);
    displayHeader(photographerData);
    this.displayRecap();
    displayFilter();
    displayWork(relatedMedias);
  
  
    // Events
    document.querySelector(".contact_button").addEventListener("click", () => displayModal());
    document.querySelector(".modal__closeBtn").addEventListener("click", () => closeModal());
    document.querySelector('.modal__submit').addEventListener("click", (e) => checkDatas(e));
  }

  async displayRecap() {
    // photographerData
    console.log(this._photographer)
    let likes = 0
    this._relatedMedias.forEach(singleWork => likes += singleWork.likes)
    const recap = new Recap(this._photographer.price, likes);
  
    $main.innerHTML += recap.render();
  
  }
  
  async getPhotographer () {
    const selectedPhotographer = this._datas.photographers.filter(photographer => photographer.id == this._id); 
    return selectedPhotographer[0];
  }

  async getRelatedWork() {
    return this._datas.media.filter(singleMedia => singleMedia.photographerId == this._id);
  }
}




const app = new App();
app.start();

