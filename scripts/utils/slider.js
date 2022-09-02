import MediaCard from "../views/media/Card.js";

export default class Slider {
    constructor(currentId, works) {
        this._works = works;
        this._currentID = currentId;

        // dom elements
        this.$closeIcon = document.querySelector(".fa-xmark");
        this.$nextIcon = document.querySelector('.lightbox__controls .fa-angle-right')
        this.$prevIcon = document.querySelector('.lightbox__controls .fa-angle-left')
    }

    main () {

        
        const item = this._works.find(work => this._currentID == work._id);
        this.createSlide(item);

        document.querySelector('.lightbox').classList.add('open');

        // Events listener for navigation
        this.$closeIcon.addEventListener("click", () => this.close());
        this.$nextIcon.addEventListener('click', (e) => { e.stopImmediatePropagation(), this.next()});
        this.$prevIcon.addEventListener('click', (e) => { e.stopImmediatePropagation(), this.prev()});
    
    }



    createSlide(item , prev) {

        this._currentID = item._id;
        document.querySelector(`.media__card[data-id="${this._currentID}"]`).classList.add('active');
        const Media = new MediaCard(item);

        let $slide = document.createElement("div");
        $slide.setAttribute('class', "lightbox__slide");
        $slide.innerHTML = Media.renderSlide();


        // Si c'est le btn prev qui a été selectionné, on ajoute la slide en premier enfant du slider dans le dom
        if (!prev) {
            document.querySelector(".lightbox__slider").appendChild($slide);       
        }  else {
            document.querySelector(".lightbox__slider").insertBefore($slide, document.querySelector(".lightbox__slider").firstChild);
        }

    }

    close () {
        document.querySelector('.lightbox').classList.remove('open');
        document.querySelectorAll('.media__card.active').forEach(element => element.classList.remove('active'));
        document.querySelectorAll('.lightbox__slide').forEach($slide => $slide.remove());
   
    }

    next () {


        this._currentID = document.querySelector('.media__card.active').dataset.id;

        document.querySelector('.media__card.active').classList.remove("active")

        let formerIndex = this._works.findIndex(work => work._id == this._currentID );
        let $formerSlide = document.querySelector(`.lightbox__card[data-slide="${this._currentID}"]`).parentNode;
  
        
        if (formerIndex+1 == this._works.length) {
            this.createSlide(this._works[0])
        } else {
            this.createSlide(this._works[formerIndex+1]);
        }
        
        $formerSlide.classList.add('swipeToLeft');

        setTimeout( ()=> $formerSlide.remove(), 1200)
    }


    prev () {

        this._currentID = document.querySelector('.media__card.active').dataset.id;
        document.querySelector('.media__card.active').classList.remove("active")

        let formerIndex = this._works.findIndex(work => work._id == this._currentID );
        let $formerSlide = document.querySelector(`.lightbox__card[data-slide="${this._currentID}"]`).parentNode;



        // Je trouve l'ID de la prochaine slide, détermine sa position dans le tableau this._works et la crée via la fonction createslide()
        if (formerIndex == 0) {
            this.createSlide(this._works[this._works.length-1]);
        } else {
            this.createSlide(this._works[formerIndex-1]);
        }

        $formerSlide.classList.add('swipeToRight');

        setTimeout( ()=> $formerSlide.remove(), 1200)
    }

}

// David : essaie de this._currentID qui ne passait pas la bonne valeur à next / prev: