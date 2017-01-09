var modal, span, body;
// Get the modal
modal = document.getElementById('menu');

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

body = document.getElementById('body');

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// This only work on generic based keyboards, and of course most of them are directed to windows users
// we have to keep mac in mind
document.onkeyup = function (event) {
    var x = event.which || event.keyCode;
    if (x === 79) {
        body.style.cursor = "default";
        modal.style.display = "block";
    } else if ((x === 88 || x === 27) && (modal.style.display === "block")) {
        modal.style.display = "none";
    }
}