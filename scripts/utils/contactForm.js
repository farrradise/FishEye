function displayModal() {
    const $modal = document.getElementById("contact_modal");
    $modal.classList.add("open");
    $modal.querySelector('input').focus();
    setTimeout(() => $modal.querySelector(".modal__container").classList.add("open"), 0);


    document.querySelector('.modal__submit').addEventListener("click", (e) => checkDatas(e));



    $modal.addEventListener("keyup", event => {
        let KEY = event.code; 
        if (KEY === "Escape") {
          closeModal();    
        }
    });

    // keepFocus();
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
        console.log("Prénom : ", $firstName.value);
        console.log("Nom : ", $lastName.value);
        console.log("Email : ", $email.value);
        console.log("Votre message : ", $message.value);


        
        setTimeout(() => document.querySelector('.modal__form').reset(), 1600);
        closeModal();
    }




}


function hasName(name) {
    const nameData = name.value;

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

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        email.parentNode.classList.remove("error");
        return true;
    } else {
        email.parentNode.classList.add("error");
        email.focus();
        return false;
    }
}

function keepFocus(){

    // add all the elements inside modal which you want to make focusable
    const $modal = document.getElementById('contact_modal'); // select the modal by it's id

    const $firstFocusableElement = $modal.querySelectorAll("[tabindex]")[0]; // get first element to be focused inside modal
    const $focusableContent = $modal.querySelectorAll("[tabindex]");
    const $lastFocusableElement = $focusableContent[$focusableContent.length - 1]; // get last element to be focused inside modal


    document.addEventListener('keydown', function(e) {
        console.log("ooooo");
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    console.log("active element", document.activeElement, $lastFocusableElement);
    if (!isTabPressed) {
        return;
    }

    if (document.activeElement == $lastFocusableElement) {
        // $firstFocusableElement.focus();
    }
    // if (e.shiftKey) { // if shift key pressed for shift + tab combination
    //     if (document.activeElement === firstFocusableElement) {
    //     lastFocusableElement.focus(); // add focus for the last focusable element
    //     e.preventDefault();
    //     }
    // } else { // if tab key is pressed
    //     if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
    //     firstFocusableElement.focus(); // add focus for the first focusable element
    //     e.preventDefault();
    //     }
    // }
    });

}

export {closeModal, displayModal, checkDatas};