//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let currentID = parseInt(params.get('id'));
const main = document.querySelector("#main");



async function displayHeader(photographerDatas) {

  try {
    const photograph = new Photographer(photographerDatas);
    const header = photograph.photographerSingleHeader();
    main.innerHTML += header;
  } catch (e) {
    console.log('an error occurs', e);
  }
};



async function displayWork(photographerWorks) {
  console.log('le travail du photographe', photographerWorks)
  photographerWorks.forEach((media) => {
    console.log(media);
  });
  main.innerHTML += 'coucou';

}



const getPhotographer = fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((value) => {
    const selectedPhotographer = value.photographers.filter(photographer => photographer.id == currentID); 
    return selectedPhotographer[0];
  });


const getWork = fetch("./data/photographers.json")
.then((response) => response.json())
.then((value) => {
  return value.media.filter(singleMedia => singleMedia.photographerId == currentID);
});




const start = async () => {
  const photographerData = await getPhotographer;
  const workData = await getWork;
  // console.log('i did it, il sagit de ', workData)
  displayHeader(photographerData);
  displayWork(workData);
};

start();
