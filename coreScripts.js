// NO JQUERY PLEASE, nothing against it, really, it's just a personal taste in this particular project
// for logical operations use !== or ===
function DawnOfANewDay() {
  var audio = new Audio('./res/sounds/Dawn-of-a-new-day.mp3');
  //setTimeout to delay audio start, to make it more like the original
  setTimeout(function () {
    audio.play();
  }, 800)
}

function mainLoad() {
  var remains, top, middle, bottom, day, today, d, h, exit, timer, timeout, modal;
  exit = 'info';
  remains = hoursRemain();
  top = 'topTitle';
  middle = 'middleTitle';
  bottom = 'bottomTitle';
  today = dayNumber();
  modal = document.getElementById('menu');

  timeout = function () {
    if (modal.style.display !== "block") {
      document.getElementById('body').style.cursor = "none";
    }
  }
  timer = setTimeout(timeout, 500);
  window.onmousemove = function () {
    clearTimeout(timer);
    document.getElementById('body').style.cursor = "default";
    timer = setTimeout(timeout, 500);
  };

  DawnOfANewDay();
  // need a callback function, like everything else, if the user chooses to do so of course
  midDayCheck(function () {
    document.getElementById(top).innerHTML = 'Fall of';
  }, function () {
    document.getElementById(top).innerHTML = 'Dawn of';
  });

  // this one has to come first, for finalHours() to work
  document.getElementById(bottom).innerHTML = '-' + remains + ' Hours Remain-';
  if (today === 1) {
    day = 'First';
  } else if (today === 2) {
    day = 'Second';
  } else if (today === 3) {
    day = 'Third';
  } else if ((~(isLeapYear()) & (today === 365)) | ((isLeapYear()) & (today === 366))) {
    var tempo;
    day = 'Final';
    // we need to create callback function to check every second, if and only if
    // the statement for the final day is true
    timeCheck(function () {
      tempo = (60 * 2) + 46;
      document.getElementById(bottom).innerHTML = '-<span id="time"></span> Time Remaining-';
      display = document.querySelector('#time');
      finalHours(tempo, display);
    }, function () {
      // 01/01/2017 - the CountDownTimer keeps running if the condition for timeCheck is true
      // please fix 
      CountDownTimer('01/01/2018 00:00 AM', bottom, false);
    });
  } else {
    day = today + 'th';
  }
  document.getElementById(middle).innerHTML = 'The ' + day + ' Day';
  fadeIn(top, 1);
  fadeIn(middle, 2);
  fadeIn(bottom, 3);
  fadeIn(exit, 1);
}
window.onload = function () {
  mainLoad();
}

//fade-in for texts, in which uses css to invoke "fill opacity" method by your reference,
//one by one per Id
function fadeIn(id, delay) {
  var elem = document.getElementById(id);
  setTimeout(function () {
    elem.style.opacity = 1;
    if (id === 'info') {
      elem.style.opacity = 0.15;
    }
  }, delay * 1000)
}


// time check until given especific time
function timeCheck(finishCallback, waitingCallback) {
  var d, h, m, s;
  condition = false;
  var interval = setInterval(function () {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    if (condition) {
      clearInterval(interval);
      finishCallback();
    } else {
      if (h === 23 & m >= 57 & s >= 13) {
        condition = true;
      } else {
        waitingCallback();
      }
    }
  }, 250);
}

//midDayCheck if it's the Dawn or Fall, needs correction
function midDayCheck(finishCallback, waitingCallback) {
  var d, h;
  cond = false;
  // var interval; this variable was used to clear the interval itself, I have other plans for it
  setInterval(function () {
    d = new Date();
    h = d.getHours();
    if (cond) {
      // clearInterval(interval);
      finishCallback();
    } else {
      if (h > 12) {
        cond = true;
      } else {
        waitingCallback();
      }
    }
  }, 250);
}

// getting day number

function dayNumber() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  // Math.ceil can be used
  return day;
}

// getting remaining hours, real time is a must optional setting, this is just a test for now

function hoursRemain() {
  var totalHours = dayNumber() * 24;
  var hour;
  //added +24 hous for leap and non-leapYear to work logically
  if (isLeapYear()) {
    hour = 8808;
  } else {
    hour = 8784;
  }
  hour -= totalHours;
  return hour;
}
//verifyin if it is a leapYear
function isLeapYear() {
  var leapYear = require('leap-year');
  var d = new Date();
  var year = d.getFullYear();
  return leapYear(year);
}

function finalHours(duration, display) {
  var audio, start, minutes, seconds, diff, firework;
  start = Date.now();
  firework = new Audio('./res/sounds/FireWorks.mp3');
  audio = new Audio('./res/sounds/FinalHours.mp3');
  audio.play();

  function timer() {
    //get the number of seconds that have elapsed since startTimer() was called
    diff = duration - (((Date.now() - start) / 1000) | 0);

    //does the same job as parseInt truncates the float
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;

    if (diff <= 0) {
      // add one second so that the count down starts at the full duration
      // example 02:46 not 02:45
      start = Date.now() + 1000;
    }
    if (minutes === 0 & seconds === 0) {
      clearInterval(intervalo);
      firework.play();
    }
  };
  //we don't want to wait a full second before the timer starts
  timer();
  intervalo = setInterval(timer, 1000);
}
// CountDownTimer('01/01/2017 00:00 AM', 'newYear');
function CountDownTimer(dt, id, showDays) {
  var end, _second, _minute, _hour, _day, timer;
  end = new Date(dt);

  _second = 1000;
  _minute = _second * 60;
  _hour = _minute * 60;
  _day = _hour * 24;

  function showRemaining() {
    var now, distance, days, hours, minutes, seconds;
    now = new Date();
    distance = end - now;
    if (distance < 0) {
      clearInterval(timer);
      // document.getElementById(id).innerHTML = 'EXPIRED!';
      return;
    }
    days = Math.floor(distance / _day);
    hours = Math.floor((distance % _day) / _hour);
    minutes = Math.floor((distance % _hour) / _minute);
    seconds = Math.floor((distance % _minute) / _second);

    if (showDays) {
      document.getElementById(id).innerHTML = '-' + days + 'Days ';
    } else {
      document.getElementById(id).innerHTML = '-';
    }
    document.getElementById(id).innerHTML += hours + ' Hours ';
    document.getElementById(id).innerHTML += minutes + ' Minutes ';
    document.getElementById(id).innerHTML += seconds + ' Seconds Remains-';
    // document.getElementById(id).innerHTML = '--';
  }
  timer = setInterval(showRemaining, 1000);
}