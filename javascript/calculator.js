let result = document.getElementById('result')

function addition(){
    let inputNum1 = document.getElementById('input-num1').valueAsNumber
    let inputNum2 = document.getElementById('input-num2').valueAsNumber
    let sumStr = "Sum: "
    result.textContent = sumStr + (inputNum1 + inputNum2)
}
function subtraction(){
    let inputNum1 = document.getElementById('input-num1').valueAsNumber
    let inputNum2 = document.getElementById('input-num2').valueAsNumber
    let diffStr = "Difference: "
    result.textContent = diffStr + (inputNum1 - inputNum2)
}
function multiplication(){
    let inputNum1 = document.getElementById('input-num1').valueAsNumber
    let inputNum2 = document.getElementById('input-num2').valueAsNumber
    let prodStr = "Product: "
    result.textContent = prodStr + (inputNum1 * inputNum2)
}
function division(){
    let inputNum1 = document.getElementById('input-num1').valueAsNumber
    let inputNum2 = document.getElementById('input-num2').valueAsNumber
    let divStr = "Quotient: "
    result.textContent = divStr + (inputNum1 / inputNum2)
}