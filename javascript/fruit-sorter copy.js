/*
  ========================================
  TIMER
  ========================================
*/
let timeEl = document.getElementById('time')

// set time
let pomodoroTime = 25

function minus(){
  if(pomodoroTime > 25){
    pomodoroTime -= 25
    timeEl.textContent = `${pomodoroTime}:00`
  }
}
function plus(){
  pomodoroTime += 25
  timeEl.textContent = `${pomodoroTime}:00`
}

let seconds = 14
let addZero = 0

let countdownSec
let countdownMin

pomodoroTime -= 24

let minContainer = document.getElementById('min-contianer')
let secContainer = document.getElementById('sec-contianer')

function playTimer() {
  // SECONDS
    countdownSec = setInterval(function(){
      seconds--

      

      timeEl.textContent = `${pomodoroTime}:${seconds}`

      if(seconds < 10){
        timeEl.textContent = `${pomodoroTime}:${addZero}${seconds}`
      }
      if(seconds === 0){
        timeEl.textContent = `${pomodoroTime}:${addZero}${seconds}`
        seconds += 15
        if(pomodoroTime === 0){
          clearInterval(countdownSec)
        }
      }
      
    }, 1000)

  // MINUTES
    countdownMin = setInterval(function(){
      pomodoroTime--

      if(pomodoroTime === 0){
        clearInterval(countdownMin)
      }
    }, 14000)
}

function pauseTimer(){
  clearInterval(countdownSec)
  clearInterval(countdownMin)
}




