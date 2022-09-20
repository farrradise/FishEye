import Api from "../db/Database.js"
import Card from '../views/photograph/Card.js'


class App {
    constructor() {
        this.$photographersSection = document.querySelector('.photographer_section')       
        this._api = new Api("./data/photographers.json");
        this._photographers;
    }
 

    async displayData() {       
        this._photographers.forEach((photographerData) => {    
            const photographerModel = new Card(photographerData);
            const userCardDOM = photographerModel.render();
            this.$photographersSection.innerHTML += userCardDOM;
        });
    }

    async start () {
        const datas = await this._api.get();
        this._photographers = datas.photographers; 
        this.displayData();
    }
  }
  
  const app = new App()
  app.start();
  

