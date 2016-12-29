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
  var remains=hoursRemain();
  var top='delayedUpperTitle';
  var middle='delayedMainTitle';
  var bottom='delayedDownerTitle';
  var day;

    document.getElementById(top).innerHTML='Dawn of';

      if(dayNumber()==1){
        day='First';
      }else if(dayNumber()==2){
        day='Second';
      }else if(dayNumber()==3){
        day='Third';
      }else if(dayNumber()==366){
        day='Final';
      }else{
        day=dayNumber()+'th';
      }
      document.getElementById(middle).innerHTML='The '+day+' Day';

    document.getElementById(bottom).innerHTML='-'+remains+' Hours Remain-';
  fadeIn(top,1);
  fadeIn(middle,2);
  fadeIn(bottom,3);
}

// pegando o número do dia

function dayNumber(){
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  // pode ser usado o Math.ceil tbm, mas não vejo certa necessidade
  return day;
}

// pegando as horas restantes, precisa pôr em tempo real, por enquanto
// é só teste

// update: só Deus sabe o que tentei fazer aqui
function hoursRemain(){
  var today=dayNumber();
  var year=366;
  var hour=8760;

  for(;today<year;today--){
    hour=hour-24;
  }
  return hour;
}