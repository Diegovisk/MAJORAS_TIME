// NO JQUERY PLEASE, nothing against it, really, it's just a personal taste in this particular project
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
  var remains,top,middle,bottom,day,today;
   remains=hoursRemain();
   top='topTitle';
   middle='middleTitle';
   bottom='bottomTitle';
   today=dayNumber();
    DawnOfANewDay();
    // this one has to come first, for finalHours() to work
    document.getElementById(top).innerHTML='Dawn of';
    document.getElementById(bottom).innerHTML='-'+remains+' Hours Remain-';
      if(today==1){
        day='First';
      }else if(today==2){
        day='Second';
      }else if(today==3){
        day='Third';
      }else if((~(isLeapYear())&(today==365))|((isLeapYear())&(today==366))){
        var tempo,d,h,m,s;
        d =new Date();
        // we need to create callback function to check every second
        h = d.getHours();
        m = d.getMinutes();
        s = d.getSeconds();
        day='Final';
        tempo=(60*2)+46;
        if(h==23&m>=57&s>=13){
          document.getElementById(top).innerHTML='Fall of';
          document.getElementById(bottom).innerHTML='-<span id="time"></span> Time Remaining-';
          display = document.querySelector('#time');
          finalHours(tempo,display);
        }
      }else{
        day=today+'th';
      }
      document.getElementById(middle).innerHTML='The '+day+' Day';
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
  //added +24 hous for leap and non-leapYear to work logically
  if(isLeapYear()){
    hour=8808;
  }else{
    hour=8784;
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

function finalHours(duration,display){
  var audio,start,minutes,seconds,diff;
  start = Date.now();
  audio= new Audio('FinalHours.mp3');
      audio.play();
      function timer(){
        //get the number of seconds that have elapsed since startTimer() was called
        diff = duration - (((Date.now() - start)/1000)|0);

        //does the same job as parseInt truncates the float
        minutes = (diff/60)|0;
        seconds = (diff%60)|0;

        minutes = minutes < 10 ? "0"+minutes:minutes;
        seconds=seconds < 10 ? "0"+seconds:seconds;
        display.textContent = minutes + ":" + seconds;

        if(diff<=0){
          // add one second so that the count down starts at the full duration
          // example 02:46 not 02:45
          start = Date.now()+1000;
        }
      };
      //we don't want to wait a full second before the timer starts
      timer();
      setInterval(timer,1000);
}
