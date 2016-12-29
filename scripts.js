function DawnOfANewDay() {
  var audio = new Audio('Dawn-of-a-new-day.mp3');
  // setTimeout para dar delay de inicio e ficar de acordo com o original
  // que no qual só toca quando o título principal aparece, com milésimos
  // de segundos de antecedência (no original)
  setTimeout(function(){
    audio.play();
  },800)
}

//fadeIn para esmaecer entrada dos textos, on qual pega em seu estilo (css)
//para invocar o método de preenchimento de opacidade, pela sua referência,
//um por vez, de Id
function fadeIn(id, delay){
  var elem = document.getElementById(id);
  setTimeout(function(){
    elem.style.opacity = 1;
  },delay*1000)
}
//utiliza da função fadeIn criada com os devidos parâmetros
// Obs.: Não pode deixar um parâmetro nulo!!! Todos tem que ser usados.
// Obs.: pode sim, mas fica muito feio
window.onload = function(){
  fadeIn('delayedUpperTitle',1);
  fadeIn('delayedMainTitle', 2);
  fadeIn('delayedDownerTitle',3);
}
