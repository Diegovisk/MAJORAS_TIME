function DawnOfANewDay() {
  var audio = new Audio('Dawn-of-a-new-day.mp3');
  //setTimeout to delay audio start, to make it more like the original
  setTimeout(function(){
    audio.play();
  },800)
}

//fade-in for texts, in which uses css to invoke "fill opacity" method by your reference,
//one by one per Id
function fadeIn(id, delay){
  var elem = document.getElementById(id);
  setTimeout(function(){
    elem.style.opacity = 1;
  },delay*1000)
}
//using fade-in function, with their respective parameters
window.onload = function(){
  var remains=hoursRemain();
  var top='topTitle';
  var middle='middleTitle';
  var bottom='bottomTitle';
  var day;
  var today=dayNumber();
  DawnOfANewDay();
    document.getElementById(top).innerHTML='Dawn of';

      if(today==1){
        day='First';
      }else if(today==2){
        day='Second';
      }else if(today==3){
        day='Third';
      }else if((~(isLeapYear())&(today==365))|((isLeapYear())&(today==366))){
        day='Final';
      }else{
        day=today+'th';
      }
      document.getElementById(middle).innerHTML='The '+day+' Day';

    document.getElementById(bottom).innerHTML='-'+remains+' Hours Remain-';
  fadeIn(top,1);
  fadeIn(middle,2);
  fadeIn(bottom,3);
}

// getting day number

function dayNumber(){
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  // Math.ceil can be used
  return day;
}

// getting remaining hours, real time is a must optional setting, this is just a test for now

function hoursRemain(){
  var totalHours=dayNumber()*24;
  var hour;
  if(isLeapYear()){
    hour=8784;
  }else{
    hour=8760;
  }
  hour-=totalHours;
  return hour;
}
//verifyin if it is a leapYear
function isLeapYear(){
  var leapYear= require('leap-year');
  var d=new Date();
  var year=d.getFullYear();
  return leapYear(year);
}