function displayModal() {
    const modal = document.getElementById("contact_modal");
    console.log("yooooo")
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function test() {
    console.log("yooooo la famille");
}

export {closeModal, displayModal, test};
// export avec cette syntaxe not working