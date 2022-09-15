import MediaCard from "../views/media/Card.js";
// import Media from "../models/Media.js";

export default function slider(e, works) {
    e.preventDefault();

    let currentSlideID = e.target.closest('.media__card').getAttribute('data-id')
    console.log("works", works)

    
    const media = works.find(work => currentSlideID == work._id);
    // const Media = new Media(item);
    createSlide(media);

    document.querySelector('.lightbox').classList.add('open');

    document.querySelector(".fa-xmark").addEventListener("click", () => closeSlider());
    document.querySelector('.lightbox__controls .fa-angle-right').addEventListener('click', (e) => { e.stopImmediatePropagation(), swipeRight(works)});
    document.querySelector('.lightbox__controls .fa-angle-left').addEventListener('click', (e) => { e.stopImmediatePropagation(), swipeLeft(works)});

    


}

function createSlide(media, firstChild) {
    
    console.log("media", media);
    document.querySelector(`.media__card[data-id="${media._id}"]`).classList.add('active');
    const card = new MediaCard(media);


    let $slide = document.createElement("div");
    $slide.setAttribute('class', "lightbox__slide");
    $slide.innerHTML = card.renderSlide();


    if (!firstchild) {
        document.querySelector(".lightbox__slider").appendChild($slide);       
    } else {
        document.querySelector(".lightbox__slider").insertBefore($slide, document.querySelector(".lightbox__slider").firstChild);
    }
       


    


}


function closeSlider() {
    document.querySelector('.lightbox').classList.remove('open');
    document.querySelector('.media__card.active').classList.remove('active');
    document.querySelectorAll('.lightbox__slide').forEach($slide => $slide.remove());

}

function swipeRight(works) {


    // Je récupère l'élément du dom dans une variable 
    const currentID = document.querySelector('.media__card.active').getAttribute('data-id');
    const $currentSlide = document.querySelector(`.lightbox__card[data-slide="${currentID}"]`).closest(".lightbox__slide");
    const $currentCard = document.querySelector(`.media__card[data-id="${currentID}"]`);

    console.log("currentID", currentID);
    console.log("$currentSlide", $currentSlide);
    console.log("$currentCard", $currentCard);
    // Je vérifie qu'il ne s'agit pas du dernier element et quon peut swiper à droite     
    if ($currentCard.parentNode.lastElementChild == $currentCard ) {
        console.log("dernier element ça ne peut pas fonctionner");
        return;
    }


    $currentSlide.classList.add('swipeToLeft');


    // Jenlève la classe active au media__card actif jusque là
    $currentCard.classList.remove('active');

    // Je trouve l'ID de la prochaine slide et la crée via la fonction createslide()
    const nextSlideID = $currentCard.nextSibling.getAttribute('data-id');
    createSlide(works);
    setTimeout( ()=> $currentSlide.remove(), 1200)
}

function swipeLeft(works) {


    const currentID = document.querySelector('.media__card.active').getAttribute('data-id');
    const $currentSlide = document.querySelector(`.lightbox__card[data-slide="${currentID}"]`).closest(".lightbox__slide");
    const $currentCard = document.querySelector(`.media__card[data-id="${currentID}"]`);

    // Je vérifie qu'il ne s'agit pas du dernier element et quon peut swiper à droite     
    if ($currentCard.parentNode.firstElementChild == $currentCard ) {
        console.log("dernier element ça ne peut pas fonctionner");
        return;
    }


    $currentSlide.classList.add('swipeToRight');


    // Jenlève la classe active au media__card actif jusque là
    $currentCard.classList.remove('active');

    // Je trouve l'ID de la prochaine slide et la crée via la fonction createslide()
    const nextSlideID = $currentCard.previousSibling.getAttribute('data-id');
    createSlide(nextSlideID, works, true);
    setTimeout( ()=> $currentSlide.remove(), 1200)
}