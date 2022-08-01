import MediaCard from "../views/media/Card.js";

export default function slider(e, works) {
    e.preventDefault();
    
    if (!document.querySelector('.lightbox__card')) {

        const $slider = createSlides(works);
    }

    // toggleSlider();
    document.querySelector('.lightbox').classList.add('open');

    // document.querySelectorAll('.media__link').forEach( media => media.addEventListener("click", (e) => slider(e, works)));
    




}


function createSlides (works) {
    let $slides = "";
    const $slider = document.querySelector(".lightbox__slider");



    works.forEach(work => {

        // Le probleme ici  : innerHTML fait disparaitre les event listener permettant de cliquer sur un media et douvrir le slider 
        const Media = new MediaCard(work);
        let $slide = document.createElement("div");
        $slide.setAttribute('class', "lightbox__slide");
        $slide.innerHTML = Media.renderSlide();
        $slider.appendChild($slide);

    });
    
    document.querySelector('.lightbox__controls .fa-xmark').addEventListener('click', () => closeSlider());
    document.querySelector('.lightbox__controls .fa-angle-right').addEventListener('click', () => swipeRight());

}


function closeSlider() {

    document.querySelector('.lightbox').classList.remove('open');

}

function swipeRight() {
    console.log("coucou");

    const lightboxSliderStyle = window.getComputedStyle(document.querySelector(".lightbox__slider"));
    let valueTranslateX = lightboxSliderStyle.getPropertyValue('transform');
    console.log('la valeur de translate', valueTranslateX, valueTranslateX[19],  valueTranslateX[20]);

    // check if last child 
    // if not :
    // 1 / get translate X value from lightbox__slider
    // add -100% to property translate;
    // add current class to active slide and remove class from former slide 
}

function swipeLeft() {
    // check if first child 
    // if not :
    // 1 / get translate X value from lightbox__slider
    // add 100% to property translate;
    // add current class to active slide and remove class from former slide 
}
