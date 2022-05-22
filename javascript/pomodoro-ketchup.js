/*
  ========================================
  TIMER
  ========================================
*/
let timeEl = document.getElementById('time')

let plusBtn = document.getElementById('plus-btn')
let minusBtn = document.getElementById('minus-btn')
let playBtn = document.getElementById('play-btn')
let pauseBtn = document.getElementById('pause-btn')
let restartBtn = document.getElementById('restart-btn')
let claimBtn = document.getElementById('claim-btn')

let harvestMsg = document.getElementById('harvest-msg')
let totalWorkTomato = 1
let hrsWork
let mnsWork

let pomodoroTime = 25
let displayTime = 25

function minus(){
  if(pomodoroTime > 25){
    pomodoroTime -= 25
    displayTime -= 25
    timeEl.textContent = `${displayTime}:00`

    totalWorkTomato = displayTime / 25
    hrsWork = Math.trunc(displayTime / 60) 
    mnsWork = displayTime % 60
    harvestMsg.textContent = `${totalWorkTomato} 🍅 for working ${hrsWork}h ${mnsWork}m`

    if(displayTime < 60){
      harvestMsg.textContent = `${totalWorkTomato} 🍅 for working ${mnsWork}m`
    }
  }
}
function plus(){
  pomodoroTime += 25
  displayTime += 25
  timeEl.textContent = `${displayTime}:00`

  totalWorkTomato = displayTime / 25
  hrsWork = Math.trunc(displayTime / 60) 
  mnsWork = displayTime % 60
  harvestMsg.textContent = `${totalWorkTomato} 🍅 for working ${hrsWork}h ${mnsWork}m`

  if(displayTime < 60){
    harvestMsg.textContent = `${totalWorkTomato} 🍅 for working ${mnsWork}m`
  }
}

let seconds = 60
let addZero = 0

let countdownSec
let countdownMin

pomodoroTime -= 1

pauseBtn.style.display = 'none'

claimBtn.disabled = true

function playTimer() {
    plusBtn.style.display = 'none'
    minusBtn.style.display = 'none'
    playBtn.style.display = 'none'
    pauseBtn.style.display = 'inline-block'

  // SECONDS
    countdownSec = setInterval(function(){
      seconds--

      if(pomodoroTime >= 10){
        timeEl.textContent = `${pomodoroTime}:${seconds}`

        if(seconds < 10){
          timeEl.textContent = `${pomodoroTime}:${addZero}${seconds}`
        }
        if(seconds === 0){
          timeEl.textContent = `${pomodoroTime}:${addZero}${seconds}`
          seconds += 60
          if(pomodoroTime === 0){
            clearInterval(countdownSec)
            claimBtn.disabled = false
          }
        }
      }

      if(pomodoroTime < 10){
        timeEl.textContent = `0${pomodoroTime}:${seconds}`

        if(seconds < 10){
          timeEl.textContent = `0${pomodoroTime}:${addZero}${seconds}`
        }
        if(seconds === 0){
          timeEl.textContent = `0${pomodoroTime}:${addZero}${seconds}`
          seconds += 60
          if(pomodoroTime === 0){
            clearInterval(countdownSec)
            claimBtn.disabled = false
          }
        }
      } 
    }, 1000)

  // MINUTES
    countdownMin = setInterval(function(){
      pomodoroTime--
      if(pomodoroTime === 0){
        clearInterval(countdownMin)
      }
    }, 60000)
}

function pauseTimer(){
  clearInterval(countdownSec)
  clearInterval(countdownMin)
  playBtn.style.display = 'inline-block'
  pauseBtn.style.display = 'none'
}

function restartTimer(){
  timeEl.textContent = `${displayTime}:00`
  pomodoroTime = displayTime - 1
  seconds = 60

  pauseTimer()

  plusBtn.style.display = 'inline-block'
  minusBtn.style.display = 'inline-block'
}

/*
  ========================================
  TOMATO STORAGE
  ========================================
*/
let tomatoStorageList = document.getElementById('tomato-storage-list')
let totalStorageTomatoesMsg = document.getElementById('total-storage-tomatoes')

let tomatoArray = ['🍅', '🍅', '🍅']

function claimTomatoFun(){
  for(let i = totalWorkTomato; i > 0; i--){
    let tomatoLi = document.createElement('li')
    tomatoLi.textContent += '🍅'
    tomatoStorageList.append(tomatoLi)

    tomatoArray.push('🍅')
  }
  claimBtn.disabled = false
}

totalStorageTomatoes = tomatoArray.length
totalStorageTomatoesMsg.textContent = `You have ${totalStorageTomatoes} 🍅`

/*
  ========================================
  KETCHUP FACTORY
  ========================================
*/
let possibleKetchups = Math.trunc(totalStorageTomatoes / 2)

let sweetInput = document.getElementById('sweet-input')
let spicyInput = document.getElementById('spicy-input')
let sweetSpicyInput = document.getElementById('sweet-spicy-input') 

sweetInput.max = possibleKetchups
spicyInput.max = possibleKetchups
sweetSpicyInput.max = possibleKetchups



/*
  ========================================
  KETCHUP STORAGE
  ========================================
*/












