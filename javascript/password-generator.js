/*
  ========================================
  COPY
  ========================================
*/
let firstPass = document.getElementById('first-pass')
let secondPass = document.getElementById('second-pass')
let thirdPass = document.getElementById('third-pass')
let fourthPass = document.getElementById('fourth-pass')

let firstClipboard = document.getElementById('first-cb')
let secondClipboard = document.getElementById('second-cb')
let thirdClipboard = document.getElementById('third-cb')
let fourthClipboard = document.getElementById('fourth-cb')

function copyFirstPassFun(){
    copyPassFun(firstPass)
    firstClipboard.className = "fas fa-clipboard-check"
}
function copySecondPassFun(){
    copyPassFun(secondPass)
    secondClipboard.className = "fas fa-clipboard-check"
}
function copyThirdPassFun(){
    copyPassFun(thirdPass)
    thirdClipboard.className = "fas fa-clipboard-check"
}
function copyFourthPassFun(){
    copyPassFun(fourthPass)
    fourthClipboard.className = "fas fa-clipboard-check"
}

function copyPassFun(copyThisPass){
    copyThisPass.select()
    copyThisPass.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(copyThisPass.value)

    // alert("Password copied to clipboard")
}

/*
  ========================================
  CUSTOMIZE
  ========================================
*/

// LENGTH
let lengthNum = document.getElementById('length-num')
let count = 15

function minus(){
    if(count > 0){
        count -= 1
        lengthNum.textContent = count
    }
    if(count === 0){
        count += 0
        lengthNum.textContent = count
    }
}
function plus(){
    if(count > 0 && count < 100){
        count += 1
        lengthNum.textContent = count
    }
    if(count === 0){
        count += 1
        lengthNum.textContent = count
    }
}

/*
  ========================================
  RANDOM PASSWORD GENERATION
  ========================================
*/
let characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

let lettersOnly = characters.slice(0, 52)
let withNumbers = characters.slice(52, 62)
withNumbers = withNumbers.concat(lettersOnly)
let withSymbols = characters.slice(62, characters.length)
withSymbols = withSymbols.concat(lettersOnly)

let randomNum

let symbolCheck = document.getElementById("symbol-check")
let numberCheck = document.getElementById("number-check")
let newCheckbox = document.createElement('input')
newCheckbox.type = "checkbox";

let firstInput = document.querySelector('input[name="first-pass"]')
let secondInput = document.querySelector('input[name="second-pass"]')
let thirdInput = document.querySelector('input[name="third-pass"]')
let fourthInput = document.querySelector('input[name="fourth-pass"]')

let firstArr = []
let secondArr = []
let thirdArr = []
let fourthArr = []

function symbolNumberCheckFun(){
    if(symbolCheck.checked === true && numberCheck.checked === true){
        newCheckbox.checked = true
    }
}
let symbolOn = false
function symbolCheckFun(){
    if(symbolCheck.checked === true){
        symbolOn = true
    }   
}
let numberOn = false
function numberCheckFun(){
    if(numberCheck.checked === true){
        numberOn = true
    }
}

function getRandomNumber(){
    symbolNumberCheckFun()
    symbolCheckFun()
    numberCheckFun()
    if(symbolOn === true && newCheckbox.checked === false){
        randomNum = Math.floor(Math.random() * (withSymbols.length -1))
        // console.log(randomNum)
    }
    if(numberOn === true && newCheckbox.checked === false){
        randomNum = Math.floor(Math.random() * (withNumbers.length -1))
        // console.log(randomNum)
    }
    if(newCheckbox.checked === true){
        randomNum = Math.floor(Math.random() * (characters.length -1))
        // console.log(randomNum)
    }
    if(symbolCheck.checked === false && numberCheck.checked === false){
        randomNum = Math.floor(Math.random() * (lettersOnly.length -1))
        // console.log(randomNum)
    }
}

function pushToArray(newArray){
    symbolNumberCheckFun()
    symbolCheckFun()
    numberCheckFun()
    if(symbolOn === true && newCheckbox.checked === false){
        newArray.push(withSymbols[randomNum])
        // console.log(firstArr)
    }
    if(numberOn === true && newCheckbox.checked === false){
        newArray.push(withNumbers[randomNum])
        // console.log(firstArr)
    }
    if(newCheckbox.checked === true){
        newArray.push(characters[randomNum])
        // console.log(firstArr)
    }
    if(symbolCheck.checked === false && numberCheck.checked === false){
        newArray.push(lettersOnly[randomNum])
        // console.log(firstArr)
    }
}
function passOnInput(inputValue, inputArray){
    inputValue.value = inputArray.join('')
}
function popChar(theArray){
    theArray.pop()
}
function slicePassArray(passArray){
    passArray.splice(0, passArray.length)
}

let restart = false

function getRandomCharacters(){
    if(restart === true){
        slicePassArray(firstArr)
        slicePassArray(secondArr)

        firstClipboard.className = "fas fa-clipboard"
        secondClipboard.className = "fas fa-clipboard"
        thirdClipboard.className = "fas fa-clipboard"
        fourthClipboard.className = "fas fa-clipboard"
    }
    while(firstArr.length !== count){
        getRandomNumber()
        pushToArray(firstArr)
        passOnInput(firstInput, firstArr)
        while(firstArr.length > count){
            popChar(firstArr)
            passOnInput(firstInput, firstArr)
        }
        restart = true
    }
    while(secondArr.length !== count){
        getRandomNumber()
        pushToArray(secondArr)
        passOnInput(secondInput, secondArr)
        while(secondArr.length > count){
            popChar(secondArr)
            passOnInput(secondInput, secondArr)
        }
        restart = true
    }
    while(thirdArr.length !== count){
        getRandomNumber()
        pushToArray(thirdArr)
        passOnInput(thirdInput, thirdArr)
        while(thirdArr.length > count){
            popChar(thirdArr)
            passOnInput(thirdInput, thirdArr)
        }
        restart = true
    }
    while(fourthArr.length !== count){
        getRandomNumber()
        pushToArray(fourthArr)
        passOnInput(fourthInput, fourthArr)
        while(fourthArr.length > count){
            popChar(fourthArr)
            passOnInput(fourthInput, fourthArr)
        }
        restart = true
    }
    if(firstArr.length === count && secondArr.length === count && thirdArr.length !== count && fourthArr.length !== count){
        symbolOn = false
        numberOn = false
        newCheckbox.checked = false
    }
}

