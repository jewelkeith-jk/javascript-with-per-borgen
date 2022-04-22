let inputNum = document.getElementById("input-num")
inputNum.addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("convert-btn").click();
    }
})

let convertBtn = document.getElementById("convert-btn")
convertBtn.addEventListener("click", conversion)

function conversion(){
    let number = document.getElementById("input-num").valueAsNumber
    let lengthMFFM = document.getElementById("length-mf-fm")
    let volumeLGGL = document.getElementById("volume-lg-gl")
    let massKPPK = document.getElementById("mass-kp-pk")
// Meter to Feet | Feet to Meter
    let meterfeet = number * 3.28084
    let feetmeter = number / 3.28084
    roundMF = Math.round((meterfeet + Number.EPSILON) * 1000) / 1000
    roundFM = Math.round((feetmeter + Number.EPSILON) * 1000) / 1000
    lengthMFFM.textContent = 
    number + " meters" + " = " + roundMF + " feet | " 
    + number + " feet" + " = " + roundFM + " meters"
// Liter to Gallon | Gallon to Liter
    let litergallon = number * 0.264172
    let gallonliter = number / 0.264172
    roundMF = Math.round((litergallon + Number.EPSILON) * 1000) / 1000
    roundFM = Math.round((gallonliter + Number.EPSILON) * 1000) / 1000
    volumeLGGL.textContent = 
    number + " liters" + " = " + roundMF + " gallons | " 
    + number + " gallons" + " = " + roundFM + " liters"
// Kilo to Pound | Pound to Kilo
    let kilopound = number * 2.2046
    let poundkilo = number / 2.2046
    roundMF = Math.round((kilopound + Number.EPSILON) * 1000) / 1000
    roundFM = Math.round((poundkilo + Number.EPSILON) * 1000) / 1000
    massKPPK.textContent = 
    number + " kilos" + " = " + roundMF + " pounds | " 
    + number + " pounds" + " = " + roundFM + " kilos"
}