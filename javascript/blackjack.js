/*
  ========================================
  PLAYER INFO SECTION
  ========================================
*/
// player info
let playerName = document.querySelector('#player-name')
let playerInfo = document.getElementById('player-info')
    // save edit buttons
let saveBtn = document.getElementById('save-btn')
let editEl = document.getElementById('edit-btn')
editEl.disabled = true
    // input textfield
let nameInputField = document.querySelector('#player-name-input')

function savePlayerName(){
    let nameInput = document.getElementById('player-name-input').value
    playerName.style.display = 'inline'
    playerName.textContent = `${nameInput}`
    nameInputField.style.display = 'none'
    saveBtn.disabled = true
    editEl.disabled = false
}

function editPlayerName(){
    playerName.style.display = 'none'
    nameInputField.style.display = 'inline'
    saveBtn.disabled = false
}

// balance
let defaultBal = document.getElementById('balance-label')

let bankContainer = document.getElementById('bank-container')
let balanceEl = document.createElement('p')
bankContainer.append(balanceEl)

// let balanceEl = document.getElementById('balance-number')

let balanceAmount = 300

/*
  ========================================
  BET SECTION
  ========================================
*/
let bet = document.getElementById("bet-money")
let prizeMoneyMessage = document.getElementById('prize-money')
let redoBtn = document.getElementById('redo-btn')
redoBtn.style.display = 'none'
let plusMinusSection = document.querySelector('.plusminus')
let plusBtn = document.getElementById('plus-btn')
let minusBtn = document.getElementById('minus-btn')
plusBtn.disabled = false
minusBtn.disabled = false

let requireBetMsg = document.createElement('p')
requireBetMsg.classList.add('required-bet-msg')
plusMinusSection.appendChild(requireBetMsg)

let count = 0
let doubleBetPrize = 0

function minus(){
    defaultBal.style.display = 'none'

    if(count > 0){
        count -= 10
        bet.textContent = count

        balanceAmount += 10
        balanceEl.textContent = `Bank: 🪙` + balanceAmount
    }
    if(count === 0){
        balanceAmount += 0
        balanceEl.textContent = `Bank: 🪙` + balanceAmount
    }

    doubleBetPrize = count * 2
    prizeMoneyMessage.textContent = `All right, you will get 🪙${doubleBetPrize} if you win this round 😉`

    prizeMoneyMessage.style.display = 'inline-block'
    requireBetMsg.style.display = 'none'
}
function plus(){
    defaultBal.style.display = 'none'

    if(balanceAmount > 0){
        count += 10
        bet.textContent = count

        balanceAmount -= 10
        balanceEl.textContent = `Bank: 🪙` + balanceAmount
    }
    if(balanceAmount === 0){
        balanceAmount -= 0
        balanceEl.textContent = `Bank: 🪙` + balanceAmount
    }

    doubleBetPrize = count * 2
    prizeMoneyMessage.textContent = `All right! You will get 🪙${doubleBetPrize} if you win this round 😉`
    prizeMoneyMessage.style.display = 'inline-block'
    requireBetMsg.style.display = 'none'
}

/*
  ========================================
  GAMING SECTION
  ========================================
*/
const cardsDeck = {
    1: "images/cards/A.jpg",
    2: "images/cards/2.jpg",
    3: "images/cards/3.jpg",
    4: "images/cards/4.jpg",
    5: "images/cards/5.jpg",
    6: "images/cards/6.jpg",
    7: "images/cards/7.jpg",
    8: "images/cards/8.jpg",
    9: "images/cards/9.jpg",
    10: "images/cards/10.jpg",
    11: "images/cards/J - final.jpg",
    12: "images/cards/Q - final.jpg",
    13: "images/cards/K - final.jpg"
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let messageEl = document.getElementById('message-el')
let sumEl = document.getElementById('sum-el')
let cardsEl = document.getElementById('cards-el')
let startBtn = document.getElementById('start-btn')
startBtn.disabled = false
let betSection = document.querySelector('.bet-sec')
let gameSec = document.querySelector('.game-sec')
gameSec.style.display = 'none'
let prizeMsgContainer = document.getElementById('prize-message-container')

function getRandomCard(){
    let cardImg = document.createElement('img')
    let randomNum = Math.floor(Math.random()*13)+1
    return cardImg.src = cardsDeck[randomNum]
}

function getKeyByValue(object, value){
    let valueCard = Object.keys(object).find(key => object[key] === value)
    let valueCardNum = parseInt(valueCard, 10)

    if(valueCardNum === 1){
        return 11
    } else if(valueCardNum > 10){
        return 10
    } else {
        return valueCardNum
    }
}

function startGame(){
    gameSec.style.display = 'block'

    if(count === 0){
        requireBetMsg.style.display = 'inline-block'
        requireBetMsg.textContent = `Hey! You can't bet nothing 😆`
        gameSec.style.display = 'none'
        prizeMoneyMessage.style.display = 'none'
    }
    if(count > 0){
        prizeMoneyMessage.style.display = 'none'

        betSection.style.display = 'none'
        prizeMsgContainer.append(prizeMoneyMessage)

        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]

        let firstNum = getKeyByValue(cardsDeck, firstCard)
        let secondNum = getKeyByValue(cardsDeck, secondCard)

        sum = firstNum + secondNum 
        
        renderGame()
    }
}

let cardsContainer = document.getElementById('cards-container')
let cardsHeading = document.getElementById('cards-heading')
let appendCards = document.getElementById('append-cards')
appendCards.append(cardsContainer)

let stakeContainer = document.getElementById('stake-container')

function renderGame(){
    let atStake = document.createElement('p')
    atStake.classList.add('stake-info')
    atStake.textContent = `Stake: 🪙${doubleBetPrize}`
    stakeContainer.append(atStake)

    for(let i = 0; i < cards.length; i++){
        let renderImg = document.createElement('img')
        renderImg.setAttribute('id', 'card-img')
        renderImg.classList.add('card-img', 'slide-bottom')
        renderImg.src = cards[i]  
        cardsContainer.appendChild(renderImg)
    }
    renderGamePTwo()
}

function newCard(){
    console.log(hasBlackJack)
    if(isAlive === true && hasBlackJack === false){
        let newCard = getRandomCard()
        cards.push(newCard)
        
        let newCardNum = getKeyByValue(cardsDeck, newCard)
        sum += newCardNum

        console.log(cards)

        anotherChance()
    }
}

function anotherChance(){
    for(let i = cards.length-1; i < cards.length; i++){
        let renderImg = document.createElement('img')
        renderImg.setAttribute('id', 'card-img')
        renderImg.classList.add('card-img', 'slide-bottom')
        renderImg.src = cards[i]  
        cardsContainer.appendChild(renderImg)
    }
    renderGamePTwo()
}

let newCardBtn = document.getElementById('newcard-btn')

function renderGamePTwo(){
    sumEl.textContent = `Sum: ${sum}`

    if(sum <= 20){
        message = "Do you want to draw a new card?"
    } 
    if(sum === 21){
        message = `Wohoo! You've got Blackjack! 🥳
        I've added the prize money 🪙${doubleBetPrize} to your bank 😉`
        balanceAmount += doubleBetPrize
        balanceEl.textContent = `Bank: 🪙` + balanceAmount

        newCardBtn.disabled = true
        redoBtn.style.display = 'inline-block'
        hasBlackJack = true
    } 
    if(sum > 21 && balanceAmount > 0){
        message = `Awww, you lost ☹️ But I noticed you still have some 🪙
        And there's still a high chance you'll win, right? 😉`
        newCardBtn.disabled = true
        redoBtn.style.display = 'inline-block'
        isAlive = false
    } 
    if(sum > 21 && balanceAmount < 10){
        message = `I'm sad to say that this is the end of your luck ☹️
        (But you can reload the page to have an initial amount of 🪙300 again 😂)
        So, how far did your luck bring you? Care to share? 😉`
        newCardBtn.disabled = true
        isAlive = false
    }
    messageEl.textContent = message
}

function restart(){
    // restart button
    redoBtn.style.display = 'none'

    // bet section
    betSection.style.display = 'block'
    count = 0
    bet.textContent = count

    // game section
    gameSec.style.display = 'none'

    message = ''
    messageEl.textContent = message

    newCardBtn.disabled = false

    hasBlackJack = false

    let stake = document.querySelectorAll('.stake-info')
    stake.forEach(content => {
        content.remove()
    })

    let cardImg = document.querySelectorAll('.card-img')
    cardImg.forEach(card => {
        card.remove()
    })
    
    sum = ''
    sumEl.textContent = `Sum: ${sum}`

    console.log(cards)
}


