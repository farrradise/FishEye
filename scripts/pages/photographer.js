import Api from "../db/Database.js"
import MediaFactory from '../factories/MediasFactory.js'
import Header from '../views/photograph/Header.js'
import Recap from '../views/photograph/Recap.js'
import Card from '../views/media/Card.js'
import Filter from '../views/Filter.js'
import {closeModal, displayModal, checkDatas} from '../utils/contactForm.js'
import Slider from '../utils/slider.js'



const $main = document.querySelector("#main");




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

  addLike($heart) {

    const $card = $heart.closest(".media__card");
    const $heartNb = $heart.previousElementSibling;
    const $cardID = $card.getAttribute('data-id');
    const $recapLikes = document.querySelector(".recap__likes span");
    const isAlreadyLiked = Boolean($card.getAttribute('data-liked') == "true");
  
    if (isAlreadyLiked) {
      $card.dataset.liked = "false"
      $heart.setAttribute('aria-checked', false);
      $recapLikes.textContent = parseInt($recapLikes.textContent) -1;
      $heartNb.innerHTML = parseInt($heartNb.textContent) -1;
    } else {
      $card.dataset.liked = "true"
      $heart.setAttribute('aria-checked', true);
      $recapLikes.textContent = parseInt($recapLikes.textContent) + 1;
      $heartNb.innerHTML = parseInt($heartNb.textContent) +1;
    }
     
  
  }
  
  async start () {
    const datas = await this._api.get();
    this._datas = datas;
    this._allMedias = datas.media;   
    this._photographer = await this.getPhotographer()
    this._relatedMedias = await this.getRelatedWork(); 

    
    this.displayHeader();
    this.displayRecap();
    this.displayWork();
    this.displayFilter();


  
    // Events
    document.querySelector(".contact_button").addEventListener("click", () => displayModal());
    document.querySelector(".modal__closeBtn").addEventListener("click", () => closeModal());
    document.querySelector('.modal__submit').addEventListener("click", (e) => checkDatas(e));

  }

  displayRecap() {
    let likes = 0
    this._relatedMedias.forEach(singleWork => likes += singleWork.likes)
    const recap = new Recap(this._photographer.price, likes);
  
    $main.innerHTML += recap.render();
  
  }

  displayHeader() {
    const photograph = new Header(this._photographer);
    const header = photograph.render();
    $main.innerHTML += header;


};

  displayWork() {

    if (document.querySelector(".media")) {
      document.querySelector(".media").remove();
    }
  
    const $portfolio = document.createElement('div');
    $portfolio.setAttribute("class", "media");

    let works = this._relatedMedias.map(work => new MediaFactory(work));
  
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

    // ACCESSIBILITE
    $hearts.forEach($heart => $heart.addEventListener("keyup", event => {
        let KEY = event.code; 
        if (KEY === "Enter" || KEY === "Space") {
          this.addLike($heart);      
        }
    }));
    $hearts.forEach(heart => heart.addEventListener("click", e => this.addLike(e.target)));
  
    $medias.forEach( media => media.addEventListener("click", e => { 
      e.preventDefault(); 
      const mySlider = new Slider(e.target.closest('.media__card').getAttribute('data-id'), works);
      mySlider.main();
    }));
  }

  displayFilter() {
    const filter = new Filter();
    const $filter = filter.render();
    $main.querySelector('.media').insertAdjacentHTML('beforebegin', $filter);


    // Pour ouvrir le dropdown filter
    const $triBtn = document.querySelector(".filter__choice");
    $triBtn.addEventListener("click", () => this.tri());

  }
  
  async getPhotographer () {
    const selectedPhotographer = this._datas.photographers.filter(photographer => photographer.id == this._id); 
    return selectedPhotographer[0];
  }

  async getRelatedWork() {
    return this._datas.media.filter(singleMedia => singleMedia.photographerId == this._id);
  }


  async tri(e) {

    document.querySelector('.filter__options').classList.toggle("open");
    document.querySelector('.filter__button').classList.toggle("open");
    
    if (document.querySelector('.filter__button').classList.contains('open')) {
      document.querySelectorAll('.filter__option').forEach(option => option.setAttribute("tabindex", 0));
    } else {
      document.querySelectorAll('.filter__option').forEach(option => option.setAttribute("tabindex", -1));
    }

    let triOption;


      // ACCESSIBILITE
    document.querySelectorAll('.filter__option').forEach(filterOption => filterOption.addEventListener("keyup", event => {
      let KEY = event.code; 
      if (KEY === "Enter" || KEY === "Space") {
        filterOption.click();    
      }
    }));
    document.querySelectorAll('.filter__option').forEach(filterOption => filterOption.addEventListener("click", ()=> {
      triOption = filterOption.dataset.value;
      let workData = this._relatedMedias;
 
      switch (triOption) {
  
        case "likes":
          workData.sort(function (a, b) {
            return b.likes - a.likes;
          });
          this.displayWork(workData);
          break;
    
        case "date":
          workData.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          this.displayWork(workData);
          break;
    
        case "title":
          workData.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
          this.displayWork(workData);
          break;
    
        // default: 
      }
      if   (triOption != "") {
        document.querySelector("#tri span").innerHTML = filterOption.textContent;
      } 
    }));
     
    
  }
  

  // getters
  // get datas() {
  //   console.log("est ce que la fonction est appelé")
  //   return this._datas;
  // }
}




const app = new App();
app.start();

