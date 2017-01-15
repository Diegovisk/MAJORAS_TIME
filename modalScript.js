// Needed variables
var modal, span, body, content, getImport, getContent;

// Here, we are importing the modal.html file into index.html, by selecting link reference id
// and the content area (element of the modal.html) to be imported, with the help of
// importNode(element, bool);
getImport = document.querySelector('#myModal');
getContent = getImport.import.querySelector('#menu');
document.body.appendChild(document.importNode(getContent, true));

// Get the modal and your content to modify/execute the animation
modal = document.getElementById('menu');
content = document.getElementById('content');

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

body = document.getElementById('body');

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    hide();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        hide();
    }
}

// This only work on generic based keyboards, and of course most of them are directed to windows users
// we have to keep mac in mind
document.onkeyup = function (event) {
    var x = event.which || event.keyCode;
    if ((x === 79) && (modal.style.display !== "block")) {
        body.style.cursor = "default";
        modal.style.display = "block";
    } else if ((x === 88 || x === 27 || x === 79) && (modal.style.display === "block")) {
        hide();
    }
}

//this  reverts the animatetop, and put it back in place ready for action again
function hide() {
    content.style.animation = "animatetopRe 0.4s";
    setTimeout(function () {
        content.style.animation = "animatetop 0.4s";
        modal.style.display = "none";
    }, 400)
}