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
let countdownSec
let countdownMin
pomodoroTime -= 25

pauseBtn.style.display = 'none'
claimBtn.style.display = 'none'
let plantingMsg = document.getElementById('planting-msg')

function playTimer() {
    plusBtn.style.visibility = 'hidden'
    minusBtn.style.visibility = 'hidden'
    playBtn.style.display = 'none'
    pauseBtn.style.display = 'inline-block'
    pauseBtn.style.visibility = 'visible'

    plantingMsg.textContent = `Your tomato seeds are growing`

  // SECONDS
    countdownSec = setInterval(function(){
      seconds--

      if(pomodoroTime >= 10){
        timeEl.textContent = `${pomodoroTime}:${seconds}`

        if(seconds < 10){
          timeEl.textContent = `${pomodoroTime}:0${seconds}`
        }
        if(seconds === 0){
          timeEl.textContent = `${pomodoroTime}:0${seconds}`
          seconds += 60
          if(pomodoroTime === 0){
            clearInterval(countdownSec)
          }
        }
      }

      if(pomodoroTime < 10){
        timeEl.textContent = `0${pomodoroTime}:${seconds}`

        if(seconds < 10){
          timeEl.textContent = `0${pomodoroTime}:0${seconds}`
        }
        if(seconds === 0){
          timeEl.textContent = `0${pomodoroTime}:0${seconds}`
          seconds += 60
          if(pomodoroTime === 0){
            clearInterval(countdownSec)
            claimBtn.style.display = 'inline-block'
            claimBtn.textContent = `Claim ${totalWorkTomato} 🍅`

            pauseBtn.style.visibility = 'hidden'
            plantingMsg.style.display = 'none'
            harvestMsg.style.display = 'none'
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

  if(totalWorkTomato === 0){
    totalWorkTomato += 1
  }

  plusBtn.style.visibility = 'visible'
  minusBtn.style.visibility = 'visible'
  plusBtn.style.display = 'inline-block'
  minusBtn.style.display = 'inline-block'
  claimBtn.style.display = 'none'

  plantingMsg.textContent = `Press play to start planting`
  plantingMsg.style.display = 'inline-block'
  harvestMsg.style.display = 'inline-block'
}

/*
  ========================================
  TOMATO STORAGE
  ========================================
*/
let tomatoStorageList = document.getElementById('tomato-storage-list')
let totalStorageTomatoesMsg = document.getElementById('total-storage-tomatoes')
let totalStorageTomatoes = 0

let tomatoArray = []

function claimTomatoFun(){
  for(let i = totalWorkTomato; i > 0; i--){
    let tomatoLi = document.createElement('li')
    tomatoLi.setAttribute('id', 'tomato-li')
    tomatoLi.textContent += '🍅'
    tomatoStorageList.append(tomatoLi)

    tomatoArray.push('🍅')
    totalWorkTomato -= 1
  }
  if(totalWorkTomato === 0){
    claimBtn.style.background = 'var(--color-pre-claim-bg)'
    claimBtn.style.boxShadow = '0 5px var(--color-pre-claim-shadow)'
    claimBtn.disabled = false
  }
  updateTotalTomatoesMsg()
  possibleKetchupsUpdate()
}

/*
  ========================================
  KETCHUP FACTORY
  ========================================
*/
let possibleKetchupsMsg = document.getElementById('possible-ketchups')

let sweetInput = document.getElementById('sweet-input')
let spicyInput = document.getElementById('spicy-input')
let sweetSpicyInput = document.getElementById('sweet-spicy-input') 

let sweetCount = 0
let spicyCount = 0
let sweetSpicyCount = 0

// SWEET

function plusSweetKetchup(){
  let countPossibleKetchups = Math.trunc(totalStorageTomatoes / 2)

  if(totalStorageTomatoes > 1 && 0 < countPossibleKetchups){
    sweetCount += 1
    if(totalStorageTomatoes > 1){
      totalTomatoUpdate()
      possibleKetchupsUpdate()
      plusDecreaseTomatoLi()
    }
    sweetInput.textContent = sweetCount
    possibleKetchupsUpdate()
  }
}
function minusSweetKetchup(){
  if(sweetCount > 0){
    sweetCount -= 1
    addTomatoUpdate()

    sweetInput.textContent = sweetCount
    possibleKetchupsUpdate()
    minusIncreaseTomatoLi()
  }
}

// SPICY

function plusSpicyKetchup(){
  let countPossibleKetchups = Math.trunc(totalStorageTomatoes / 2)

  if(totalStorageTomatoes > 1 && 0 < countPossibleKetchups){
    spicyCount += 1
    if(totalStorageTomatoes > 1){
      totalTomatoUpdate()
      possibleKetchupsUpdate()
      plusDecreaseTomatoLi()
    }
    spicyInput.textContent = spicyCount
    possibleKetchupsUpdate()
  }
}
function minusSpicyKetchup(){
  if(spicyCount > 0){
    spicyCount -= 1
    addTomatoUpdate()
    
    spicyInput.textContent = spicyCount
    possibleKetchupsUpdate()
    minusIncreaseTomatoLi()
  }
}

// SWEET & SPICY

function plusSweetSpicyKetchup(){
  let countPossibleKetchups = Math.trunc(totalStorageTomatoes / 2)
  
  if(totalStorageTomatoes > 1 && 0 < countPossibleKetchups){
    sweetSpicyCount += 1
    if(totalStorageTomatoes > 1){
      totalTomatoUpdate()
      possibleKetchupsUpdate()
      plusDecreaseTomatoLi()
    }
    sweetSpicyInput.textContent = sweetSpicyCount
    possibleKetchupsUpdate()
  }
}
function minusSweetSpicyKetchup(){
  if(sweetSpicyCount > 0){
    sweetSpicyCount -= 1
    addTomatoUpdate()

    sweetSpicyInput.textContent = sweetSpicyCount
    possibleKetchupsUpdate()
    minusIncreaseTomatoLi()
  }
}

// ketchup icon

let ketchupIcon = document.createElement('i')
ketchupIcon.classList.add('fas')
ketchupIcon.classList.add('fa-wine-bottle')
ketchupIcon.style.color = 'var(--color-white)'

// ♻️ functions 

function updateTotalTomatoesMsg(){
  totalStorageTomatoes = tomatoArray.length
  totalStorageTomatoesMsg.textContent = `You have ${totalStorageTomatoes} 🍅`
}

function possibleKetchupsUpdate(){
  let totalPossibleKetchups = Math.trunc(totalStorageTomatoes / 2)

  possibleKetchupsMsg.textContent = `You can fill up ${totalPossibleKetchups} `
  possibleKetchupsMsg.appendChild(ketchupIcon)
}

function totalTomatoUpdate(){
  for(let i = 2; i > 0; i--){
    tomatoArray.pop()

    updateTotalTomatoesMsg()
  }
}
function addTomatoUpdate(){
  for(let i = 2; i > 0; i--){
    tomatoArray.push('🍅')

    updateTotalTomatoesMsg()
  }
}

function plusDecreaseTomatoLi(){
  for(let i = 2; i > 0; i--){
    let getTomatoLi = document.getElementById('tomato-li')
    getTomatoLi.remove()
  }
}
function minusIncreaseTomatoLi(){
  for(let i = 2; i > 0; i--){
    let tomatoLi = document.createElement('li')
    tomatoLi.setAttribute('id', 'tomato-li')
    tomatoLi.textContent += '🍅'
    tomatoStorageList.append(tomatoLi)
  }
}

/*
  ========================================
  KETCHUP STORAGE
  ========================================
*/
// SWEET

let sweetStorageList = document.getElementById('sweet-storage-list')
let sweetArray = []

function addSweetKetchup(){
  for(let i = sweetCount; i > 0; i--){
    let sweetKetchupIcon = document.createElement('i')
    sweetKetchupIcon.classList.add('fas')
    sweetKetchupIcon.classList.add('fa-wine-bottle')
    sweetKetchupIcon.style.color = 'var(--color-sweet-ketchup)'

    let sweetLi = document.createElement('li')
    sweetLi.append(sweetKetchupIcon)
    sweetStorageList.append(sweetLi)

    sweetArray.push('💛')

    sweetCount -= 1
    sweetInput.textContent = sweetCount

    possibleKetchupsUpdate()

    let totalSweetKetchup = sweetArray.length
    let totalSweetMsg = document.getElementById('total-sweet')
    totalSweetMsg.textContent = `${totalSweetKetchup} `

    let sweetKetchupIcon2 = document.createElement('i')
    sweetKetchupIcon2.classList.add('fas')
    sweetKetchupIcon2.classList.add('fa-wine-bottle')
    sweetKetchupIcon2.style.color = 'var(--color-sweet-ketchup)'
    totalSweetMsg.append(sweetKetchupIcon2)
  }
}

// SPICY

let spicyStorageList = document.getElementById('spicy-storage-list')
let spicyArray = []

function addSpicyKetchup(){
  for(let i = spicyCount; i > 0; i--){
    let spicyKetchupIcon = document.createElement('i')
    spicyKetchupIcon.classList.add('fas')
    spicyKetchupIcon.classList.add('fa-wine-bottle')
    spicyKetchupIcon.style.color = 'var(--color-spicy-ketchup)'

    let spicyLi = document.createElement('li')
    spicyLi.append(spicyKetchupIcon)
    spicyStorageList.append(spicyLi)

    spicyArray.push('❤️')

    spicyCount -= 1
    spicyInput.textContent = spicyCount

    possibleKetchupsUpdate()

    let totalSpicyKetchup = spicyArray.length
    let totalSpicyMsg = document.getElementById('total-spicy')
    totalSpicyMsg.textContent = `${totalSpicyKetchup} `

    let spicyKetchupIcon2 = document.createElement('i')
    spicyKetchupIcon2.classList.add('fas')
    spicyKetchupIcon2.classList.add('fa-wine-bottle')
    spicyKetchupIcon2.style.color = 'var(--color-spicy-ketchup)'
    totalSpicyMsg.append(spicyKetchupIcon2)
  }
}

// SWEET & SPICY

let sweetSpicyStorageList = document.getElementById('sweet-spicy-storage-list')
let sweetSpicyArray = []

function addSweetSpicyKetchup(){
  for(let i = sweetSpicyCount; i > 0; i--){
    let sweetSpicyKetchupIcon = document.createElement('i')
    sweetSpicyKetchupIcon.classList.add('fas')
    sweetSpicyKetchupIcon.classList.add('fa-wine-bottle')
    sweetSpicyKetchupIcon.style.color = 'var(--color-sweet-spicy-ketchup)'
    
    let sweetSpicyLi = document.createElement('li')
    sweetSpicyLi.append(sweetSpicyKetchupIcon)
    sweetSpicyStorageList.append(sweetSpicyLi)

    sweetSpicyArray.push('🧡')

    sweetSpicyCount -= 1
    sweetSpicyInput.textContent = sweetSpicyCount

    possibleKetchupsUpdate()

    let totalSweetSpicyKetchup = sweetSpicyArray.length
    let totalSweetSpicyMsg = document.getElementById('total-sweet-spicy')
    totalSweetSpicyMsg.textContent = `${totalSweetSpicyKetchup} `

    let sweetSpicyKetchupIcon2 = document.createElement('i')
    sweetSpicyKetchupIcon2.classList.add('fas')
    sweetSpicyKetchupIcon2.classList.add('fa-wine-bottle')
    sweetSpicyKetchupIcon2.style.color = 'var(--color-sweet-spicy-ketchup)'
    totalSweetSpicyMsg.append(sweetSpicyKetchupIcon2)
  }
}






















