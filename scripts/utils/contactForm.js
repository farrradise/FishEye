function displayModal() {
    const $modal = document.getElementById("contact_modal");
    $modal.classList.add("open");
    $modal.querySelector('input').focus();
    setTimeout(() => $modal.querySelector(".modal__container").classList.add("open"), 0);
}

function closeModal() {
    const $modal = document.getElementById("contact_modal");
    $modal.querySelector(".modal__container").classList.remove("open")
    setTimeout(() =>     $modal.classList.remove("open"), 1000);
}


function checkDatas(event) {
    event.preventDefault();

    const $firstName = document.querySelector('#firstName');
    const $lastName = document.querySelector('#lastName');
    const $email = document.querySelector('#email');
    const $message = document.querySelector('#message');



    const emailOK = hasEmail($email); 
    const lastNameOK = hasName($lastName);
    const firstNameOK = hasName($firstName); 

    
    if (lastNameOK && firstNameOK && emailOK)  {
        console.log("Prénom : ", firstName.value);
        console.log("Nom : ", lastName.value);
        console.log("Email : ", email.value);
        console.log("Votre message : ", message.value);


        
        setTimeout(() => document.querySelector('.modal__form').reset(), 1600);
        closeModal();
    }




}


function hasName(name) {
    const nameData = name.value;
    const id = name.id


    if (nameData.length > 2) {
        name.parentNode.classList.remove("error");
        return true;
    } else {
        name.parentNode.classList.add("error");
        name.focus();
        return false;
    }
}

function hasEmail(email) {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        email.parentNode.classList.remove("error");
        return true;
    } else {
        email.parentNode.classList.add("error");
        email.focus();
        return false;
    }
}


export {closeModal, displayModal, checkDatas};