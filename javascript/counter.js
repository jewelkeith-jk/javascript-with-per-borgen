let countNum = document.getElementById("count-num")
let count = 0

function minus(){
    count -= 1
    countNum.textContent = count
}
function plus(){
    count += 1
    countNum.textContent = count
}
function restart(){
    count = 0
    countNum.textContent = count
}