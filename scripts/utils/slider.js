import MediaCard from "../views/media/Card.js";

export default function slider(e, works) {
    e.preventDefault();
    // let id = ;

    let openedSlideID = e.target.closest('.media__card').getAttribute('data-id')

    createSlide(openedSlideID, works);
    
    console.log("la slide open is", openedSlideID)
 
    
    document.querySelector('.lightbox').classList.add('open');
    document.querySelector(".fa-xmark").addEventListener("click", () => closeSlider());
    document.querySelector('.lightbox__controls .fa-angle-right').addEventListener('click', () => swipeRight(e.target, works));

    // document.querySelectorAll('.media__link').forEach( media => media.addEventListener("click", (e) => slider(e, works)));
    
    // console.log(works);



}

function createSlide(id, works, firstchild) {
    
    works.forEach(work => {
        if (id == work._id) {
            const Media = new MediaCard(work);
            let $slide = document.createElement("div");
            $slide.setAttribute('class', "lightbox__slide");
            $slide.innerHTML = Media.renderSlide();

            if (!firstchild) {
                document.querySelector(".lightbox__slider").appendChild($slide);       
            }
        }
    });
}


function closeSlider() {
    document.querySelector('.lightbox').classList.remove('open');
    document.querySelector('.lightbox__slide').remove();

}

function swipeRight(currentSlide, works) {

    // tu checkes si last element si oui return 
    // si non 
    // avec l'id tu cherches l'élément frère et tu prends l'id
    // avec cet id et le works tu crées une nouvelle slide
    // tu l'appends de manière classique (donc pas besoin d'argument) 
    // ensuite tu slides de document.querySelector(".lightbox__slider").style.transform = "translateX(-100%)"
    // tu crées fonction timeout pour remettre le translateX à 0 et supprimer la slide actuelle avec slide').remove();


    console.log(currentSlide.closest('.media__card').getAttribute('data-id'));
    document.querySelector(".lightbox__slider").style.transform = "translateX(-100%)";




    // const lightboxSliderStyle = window.getComputedStyle(document.querySelector(".lightbox__slider"));
    // let valueTranslateX = lightboxSliderStyle.getPropertyValue('transform');
    // console.log('la valeur de translate', valueTranslateX, valueTranslateX[19],  valueTranslateX[20]);

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
