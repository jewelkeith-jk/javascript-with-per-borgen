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

pomodoroTime -= 25

pauseBtn.style.display = 'none'

// claimBtn.disabled = true
claimBtn.style.visibility = 'hidden'

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
            claimBtn.style.visibility = 'visible'
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
            claimBtn.style.visibility = 'visible'
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
  pomodoroTime = displayTime - 25
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

let tomatoArray = []

function claimTomatoFun(){
  for(let i = totalWorkTomato; i > 0; i--){
    let tomatoLi = document.createElement('li')
    tomatoLi.textContent += '🍅'
    tomatoStorageList.append(tomatoLi)

    tomatoArray.push('🍅')
    totalWorkTomato -= 1
  }
  if(totalWorkTomato === 0){
    claimBtn.style.visibility = 'hidden'
  }
}

totalStorageTomatoes = tomatoArray.length
totalStorageTomatoesMsg.textContent = `You have ${totalStorageTomatoes} 🍅`

/*
  ========================================
  KETCHUP FACTORY
  ========================================
*/
let possibleKetchupsMsg = document.getElementById('possible-ketchups')
let possibleKetchups = Math.trunc(totalStorageTomatoes / 2)

let sweetInput = document.getElementById('sweet-input')
let spicyInput = document.getElementById('spicy-input')
let sweetSpicyInput = document.getElementById('sweet-spicy-input') 

let sweetCount = 0
let spicyCount = 0
let sweetSpicyCount = 0

let max = possibleKetchups + 1

// SWEET

function plusSweetKetchup(){
  if(possibleKetchups > 0 && sweetCount < max){
    sweetCount += 1
    if(possibleKetchups > 0){
      possibleKetchups -= 1
    }
    sweetInput.textContent = sweetCount
  }
}
function minusSweetKetchup(){
  if(sweetCount > 0){
    sweetCount -= 1
    possibleKetchups += 1
    
    sweetInput.textContent = sweetCount
  }
}

// SPICY

function plusSpicyKetchup(){
  if(possibleKetchups > 0 && spicyCount < max){
    spicyCount += 1
    if(possibleKetchups > 0){
      possibleKetchups -= 1
    }
    spicyInput.textContent = spicyCount
  }
}
function minusSpicyKetchup(){
  if(spicyCount > 0){
    spicyCount -= 1
    possibleKetchups += 1
    
    spicyInput.textContent = spicyCount
  }
}

// SWEET & SPICY

function plusSweetSpicyKetchup(){
  if(possibleKetchups > 0 && sweetSpicyCount < max){
    sweetSpicyCount += 1
    if(possibleKetchups > 0){
      possibleKetchups -= 1
    }
    sweetSpicyInput.textContent = sweetSpicyCount
  }
}
function minusSweetSpicyKetchup(){
  if(sweetSpicyCount > 0){
    sweetSpicyCount -= 1
    possibleKetchups += 1

    sweetSpicyInput.textContent = sweetSpicyCount
  }
}

let ketchupIcon = document.createElement('i')
ketchupIcon.classList.add('fas')
ketchupIcon.classList.add('fa-wine-bottle')
ketchupIcon.style.color = 'var(--color-white)'

function possibleKetchupsUpdate(){
  possibleKetchupsMsg.textContent = `You can fill up ${possibleKetchups} `
  possibleKetchupsMsg.appendChild(ketchupIcon)
}

possibleKetchupsUpdate()

/*
  ========================================
  KETCHUP STORAGE
  ========================================
*/
function totalTomatoUpdate(){
  tomatoArray.pop()
  tomatoArray.pop()
  totalStorageTomatoes = tomatoArray.length
  totalStorageTomatoesMsg.textContent = `You have ${totalStorageTomatoes} 🍅`
}

// SWEET

let sweetStorageList = document.getElementById('sweet-storage-list')
let sweetArray = []

function addSweetKetchup(){
  for(let i = sweetCount; i > 0; i--){
    let sweetLi = document.createElement('li')
    sweetLi.textContent += '💛'
    sweetStorageList.append(sweetLi)

    sweetArray.push('💛')

    sweetCount -= 1
    sweetInput.textContent = sweetCount

    possibleKetchupsUpdate()
    totalTomatoUpdate()

    let totalSweetKetchup = sweetArray.length
    let totalSweetMsg = document.getElementById('total-sweet')
    totalSweetMsg.textContent = `${totalSweetKetchup} 💛`
  }
}

// SPICY

let spicyStorageList = document.getElementById('spicy-storage-list')
let spicyArray = []

function addSpicyKetchup(){
  for(let i = spicyCount; i > 0; i--){
    let spicyLi = document.createElement('li')
    spicyLi.textContent += '❤️'
    spicyStorageList.append(spicyLi)

    spicyArray.push('❤️')

    spicyCount -= 1
    spicyInput.textContent = spicyCount

    possibleKetchupsUpdate()
    totalTomatoUpdate()

    let totalSpicyKetchup = spicyArray.length
    let totalSpicyMsg = document.getElementById('total-spicy')
    totalSpicyMsg.textContent = `${totalSpicyKetchup} ❤️`
  }
}

// SWEET & SPICY

let sweetSpicyStorageList = document.getElementById('sweet-spicy-storage-list')
let sweetSpicyArray = []

function addSweetSpicyKetchup(){
  for(let i = sweetSpicyCount; i > 0; i--){
    let sweetSpicyLi = document.createElement('li')
    sweetSpicyLi.textContent += '🧡'
    sweetSpicyStorageList.append(sweetSpicyLi)

    sweetSpicyArray.push('🧡')

    sweetSpicyCount -= 1
    sweetSpicyInput.textContent = sweetSpicyCount

    possibleKetchupsUpdate()
    totalTomatoUpdate()

    let totalSweetSpicyKetchup = sweetSpicyArray.length
    let totalSweetSpicyMsg = document.getElementById('total-sweet-spicy')
    totalSweetSpicyMsg.textContent = `${totalSweetSpicyKetchup} 🧡`
  }
}






















