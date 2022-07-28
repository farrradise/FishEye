function displayModal() {
    const $modal = document.getElementById("contact_modal");
    $modal.classList.add("open");
    setTimeout(() => $modal.querySelector(".modal__container").classList.add("open"), 0);
}

function closeModal() {
    const $modal = document.getElementById("contact_modal");
    $modal.querySelector(".modal__container").classList.remove("open")
    setTimeout(() =>     $modal.classList.remove("open"), 1000);
}

function checkDatas(event) {
    event.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    
    console.log("Prénom : ", firstName);
    console.log("Nom : ", lastName);
    console.log("Email : ", email);
    console.log("Votre message : ", message);

}

export {closeModal, displayModal, checkDatas};