// This script and the core one are ugly as hell, but hey "Practice is a means
// of inviting the perfection desired.”
var body,
    isIndex,
    modal,
    span,
    content;

// Making sure it is in the index.html "first"
body = document.getElementById('indexBody');

if (body !== null) {
    var getImport,
        getContent;
    // Here, we are importing the modal.html file into index.html, by selecting link
    // reference id and the content area (element of the modal.html) to be
    // imported, with the help of importNode(element, bool);
    getImport = document.querySelector('#myModal');
    getContent = getImport.import.querySelector('#menu');
    document.body.appendChild(document.importNode(getContent, true));

    isIndex = true;
}

// Get the modal and your content to modify/execute the animation, these guys
// they have to come after the "body test"
modal = document.getElementById('menu').style;
content = document.getElementById('content').style;

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];

if (isIndex) {
    content.animation = "animatetop 0.4s";
    modal.display = "none";

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

    // This only work on generic based keyboards, and of course most of them are
    // directed to windows users we have to keep mac in mind
    document.onkeyup = function (event) {
        var x = event.which || event.keyCode;
        if ((x === 79) && (modal.display !== "block")) {
            body.cursor = "default";
            modal.display = "block";
        } else if ((x === 88 || x === 27 || x === 79) && (modal.display === "block")) {
            hide();
        }
    }

    //this  reverts the animatetop, and put it back in place ready for action again
    function hide() {
        content.animation = "animatetopRe 0.4s";
        setTimeout(function () {
            content.animation = "animatetop 0.4s";
            modal.display = "none";
        }, 400)
    }
} else {
    // We must access the BrowserWindow object created by our main process and call the minimize, 
    // maximize, and close methods on that. We can access this using the 'remote' module
    var remote = require('electron').remote, win;
    // body = document.getElementById('modalBody');
    
    modal.display = "block";
    modal.paddingTop = "0px";
    content.height = "auto";
    content.width = "auto";
    
    span.onclick = function () {
        win = remote.getCurrentWindow();
        win.close();
    }
}