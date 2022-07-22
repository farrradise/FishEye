export default class Filter {
    constructor () {
        this.likes = "Popularité";
        this.date = "Date";
        this.title = "Titre";
    }

    render () {
        let options = "";

        for (const [key, value] of Object.entries(this)) {
            options += `<a class="filter__option" data-value="${key}">${value}</a>`
        }

        return `<div class="filter">
            <p class="filter__title" id="test">Trier par</p>
            <div class="filter__choice" id="filter__choice">
                <button class="filter__button" id="tri"><span>Popularité</span><i class="fa-solid fa-angle-down"></i></button>
                <div class="filter__options" >
                    ${options}
                </div>
            
            </div>
        </div>
        `
    }

}