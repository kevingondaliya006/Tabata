let currentPhase = 'prepare';
let timer;
let totalTime;
let prepareTime, workTime, restTime, cycles, tabatas;
let isPaused = false;
let isFinished = false;

function startResumeTimer() {
  if (!timer) {
    prepareTime = parseInt(document.getElementById('prepareTime').value);
    workTime = parseInt(document.getElementById('workTime').value);
    restTime = parseInt(document.getElementById('restTime').value);
    cycles = parseInt(document.getElementById('cycles').value);
    tabatas = parseInt(document.getElementById('tabatas').value);
    totalTime = prepareTime;
    currentPhase = 'prepare';
    document.body.style.backgroundColor = 'lightgreen';

    timer = setInterval(timerFunction, 1000);
  } else if (isPaused) {
    isPaused = false;
    timer = setInterval(timerFunction, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = true;
}

function playTimer() {
  if (isPaused) {
    isPaused = false;
    timer = setInterval(timerFunction, 1000);
  }
}

function resetTimer() {
  stopTimer();
  document.getElementById('prepareTime').value = 10;
  document.getElementById('workTime').value = 20;
  document.getElementById('restTime').value = 10;
  document.getElementById('cycles').value = 8;
  document.getElementById('tabatas').value = 1;
  document.getElementById('timerDisplay').textContent = '00:00';
  document.body.style.backgroundColor = '';
}

function updateDisplay(time) {
  if (!isFinished) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('timerDisplay').textContent = minutes + ':' + seconds;
  }
}

function timerFunction() {
  if (totalTime <= 0) {
    playSound("beep.mp3");
    switch (currentPhase) {
      case 'prepare':
        totalTime = workTime;
        currentPhase = 'work';
        document.body.style.backgroundColor = 'red';
        playSound("beep.mp3");
        break;
      case 'work':
        playSound("beep.mp3");
        totalTime = restTime;
        currentPhase = 'rest';
        document.body.style.backgroundColor = 'lightblue';
        playSound("beep.mp3");
        break;
      case 'rest':
        if (cycles > 1) {
          playSound("beep.mp3");
          totalTime = workTime;
          currentPhase = 'work';
          playSound("beep.mp3");
          document.body.style.backgroundColor = 'red';
          cycles--;
        } else if (tabatas > 1) {
          totalTime = prepareTime;
          currentPhase = 'prepare';
          document.body.style.backgroundColor = 'lightgreen';
          tabatas--;
          cycles = parseInt(document.getElementById('cycles').value);
        } else {
          clearInterval(timer);
          timer = null;
          document.body.style.backgroundColor = '';
          isFinished = true;
          playSound("beep.mp3");
          document.getElementById('timerDisplay').textContent = 'Hurray, You Finished ' + document.getElementById('tabatas').value + ' tabatas!';
          
        }
        break;
    }
  }
  updateDisplay(totalTime);
  totalTime--;
}

function playSound(soundPath) {
  const sound = new Audio(soundPath);
  sound.play();
 }
