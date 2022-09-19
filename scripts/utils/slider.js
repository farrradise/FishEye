import MediaCard from "../views/media/Card.js";

export default class Slider {
    constructor(currentId, works) {
        this._works = works;
        this._currentID = currentId;

        // dom elements
        this.$body = document.querySelector('body');
        this.$mainWrapper = document.querySelector('body > div');
        this.$modal = document.querySelector('#lightbox');
        this.$controls = document.querySelector('.lightbox__controls')
    }

    main () {

        
        const item = this._works.find(work => this._currentID == work._id);
        this.createSlide(item);

        document.querySelector('.lightbox').classList.add('open');
        

        this.$mainWrapper.setAttribute('aria-hidden', true);
        this.$modal.setAttribute('aria-hidden', false);
        this.$modal.style.display = 'block';

        this.controls();
    
    }


    controls() {

        
        this.$controls.innerHTML += `<i role="button" tabindex="1" aria-label="Fermer la lightbox" class="fa-solid fa-xmark"></i>
        <i role="button" tabindex="2" aria-label="Voir le média précédent" class="fa-solid fa-angle-left"></i>
        <i role="button" tabindex="3" aria-label="Voir le média suivant" class="fa-solid fa-angle-right"></i>`;
        

        this.$closeIcon = document.querySelector(".fa-xmark");
        this.$nextIcon = document.querySelector('.lightbox__controls .fa-angle-right');
        this.$prevIcon = document.querySelector('.lightbox__controls .fa-angle-left');

        this.$closeIcon.addEventListener("click", () => this.close());
        this.$nextIcon.addEventListener('click', (e) => { e.stopImmediatePropagation(), this.next()});
        this.$prevIcon.addEventListener('click', (e) => { e.stopImmediatePropagation(), this.prev()});

        this.$closeIcon.focus();
        let firstClick = true;

        this.$modal.addEventListener("keyup", event => {
            let KEY = event.code; 

            if (KEY === "Escape") {
              this.close();    
            } else if (KEY === "ArrowLeft") {
              this.prev(); 
            } else if (KEY === "ArrowRight") {
              this.next();  
            } else if (KEY === "Enter" || KEY === "Space") {
                if (!firstClick && document.activeElement == this.$closeIcon) {
                    this.close();
                } else if (document.activeElement == this.$nextIcon) {
                    this.next();
                } else if (document.activeElement == this.$prevIcon) {
                    this.prev();
                }
                
            }
            firstClick = false;

        });
        
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
        
        this.$mainWrapper.setAttribute('aria-hidden', false);
        this.$modal.removeAttribute('aria-hidden');
        this.$modal.style.display ='none';
        this.$controls.innerHTML ="";
   
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