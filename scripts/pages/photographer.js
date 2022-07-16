//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let currentID = parseInt(params.get('id'));

// console.log(id);


async function displayHeader(photographerDatas) {

  try {

    const main = document.querySelector("#main");
    const photograph = new PhotographerSingle(photographerDatas);
    const header = photograph.headerModel();
    console.log(main);
    main.innerHTML += header;
  } catch (e) {
    console.log('an error occurs', e);
  }
};



const getPhotographer = fetch("./data/photographers.json")
  .then((response) => response.json())
  .then((value) => {
    const selectedPhotographer = value.photographers.filter(photographer => photographer.id == currentID); 
    return selectedPhotographer[0];
  });




const start = async () => {
  const photographerData = await getPhotographer;
  console.log('i did it, il sagit de ', photographerData)
  displayHeader(photographerData);
};

start();
