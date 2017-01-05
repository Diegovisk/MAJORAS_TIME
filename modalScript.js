// Get the modal
var modal = document.getElementById('menu');

// Get the button that opens the modal
// var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function(){
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function(){
    modal.style.display  = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
}

    // This only work on generic based keyboards, and of course most of them are directed to windows users
    // we have to keep mac in mind
// document.onkeyup=function(e){
//   if(e.altKey && e.which == 79) {
//     // alert('Keyboard shortcut working!');
//     modal.style.display = "block";
//   }
// }