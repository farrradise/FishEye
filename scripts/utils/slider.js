import MediaCard from "../views/media/Card.js";

export default function slider(e, works) {
    e.preventDefault();
    
    if (!document.querySelector('.lightbox')) {

        const $slider = createSlider(works);
    }

    toggleSlider();







}


function createSlider (works) {
    let $slides = "";
    const $body = document.querySelector("body");


    works.forEach(work => {
        const Media = new MediaCard(work);
        $slides += Media.renderSlide();
    });

    const $slider = `<div class="lightbox modal">
        <div class="lightbox__container">
        <div class="lightbox__controls">
            <i class="fa-solid fa-xmark"></i>
            <i class="fa-solid fa-angle-left"></i>
            <i class="fa-solid fa-angle-right"></i>
        </div>
        <div class="lightbox__slider">`
            + $slides +
        ` </div>
        </div>
    </div>
    `
    document.body.innerHTML += $slider;


}


function toggleSlider() {
    document.querySelector('.lightbox').classList.toggle('open');
    document.querySelector('.lightbox__controls .fa-xmark').addEventListener('click', () => {console.log("yo"); toggleSlider()});
}
