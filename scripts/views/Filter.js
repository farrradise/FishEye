export default class Filter {
    constructor () {
        this.likes = "Popularité";
        this.date = "Date";
        this.title = "Titre";
    }

    render () {
        let options = "";

        for (const [key, value] of Object.entries(this)) {
            options += `<a role="option" title="trier par ${value}" class="filter__option"  data-value="${key}">${value}</a>`
        }

        return `<div class="filter">
            <p class="filter__title">Trier par</p>
            <div class="filter__choice" id="filter__choice">
                <button aria-haspopup="true" aria-expanded="false" aria-controls="allOptions" aria-labelledby="Afficher les options de tri" aria-label="Afficher les options de tri" class="filter__button" id="tri"><span>Popularité</span><i class="fa-solid fa-angle-down"></i></button>
                <div id="allOptions" role="listbox" class="filter__options">
                    ${options}
                </div>
            
            </div>
        </div>
        `
    }

}