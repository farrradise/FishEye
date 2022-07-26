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


export {closeModal, displayModal};