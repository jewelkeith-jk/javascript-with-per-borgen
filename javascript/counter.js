/*
  ========================================
  COUNTER
  ========================================
*/
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

/*
  ========================================
  RECORDS
  ========================================
*/

let recordsSec = document.getElementById('records-sub-sec')

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0')
let yyyy = today.getFullYear()
today = mm + '/' + dd + '/' + yyyy

function record(){
    let nthRecordStr = `✅ Day ${count} 🗓️ ${today}`

    const todayEl = document.createElement('p')
    todayEl.innerHTML = nthRecordStr

    const removeEl = document.createElement('button')
    removeEl.innerHTML = '<i class="fas fa-trash-alt"></i>'

    const nthDivEl = document.createElement('div')
    nthDivEl.classList.add('nth-div')

    const textEl = document.createElement('textarea') 
    textEl.classList.add('tasks-completed')
    textEl.rows = '3'
    textEl.cols = '30'
    textEl.placeholder = "What tasks did you complete today?"

    const textContaierEl = document.createElement('div')
    textContaierEl.classList.add('text-container')

    textContaierEl.append(textEl)

    removeEl.onclick = function removeNthEl(){
        nthDivEl.remove()
    }

    nthDivEl.append(removeEl, todayEl, textContaierEl)
    recordsSec.append(nthDivEl)
}


