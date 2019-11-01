//constants

// state variables
let arrPos = 0
let world = 'jungle'
let mvdLtr = ""
let orgParent


// cached elements 
let ltrs = document.getElementById('letters')
let wrd = document.getElementById('word')
let bdy = document.querySelector('body')

// event listeners

// data structures
let jungle = [{name: 'MONKEY', photo: null, funFact: null}]



//drag and drop functions
let onDragStart = function(event){
    id = event.target.id
    orgParent = event.target.parentNode
    // event.dataTransfer.effectAllowed = "move"
    // event.dataTransfer.getData('text', event.target.id)
    mvdLtr= event.target.id
    event.target.className = 'invisible'
    if(event.target.parentNode.id[0] ==='l'){
        event.target.parentNode.className = 'word';
    } 
}

let onDragEnd = function(event){

}

let onDragOver = function(event) {
    event.preventDefault()
}

let onDrop = function(event) {
    event.preventDefault()
    // let id = event.dataTransfer.getData('text')
    console.log('I tried this: ' + id)
    const draggedLtr = document.getElementById(mvdLtr) 
    draggedLtr.AllowDrop = false
    const wrdHolder = document.getElementById(event.target.id)
    draggedLtr.className = 'ltr'
    wrdHolder.appendChild(draggedLtr)
    // wrdHolder.remove('word')
    wrdHolder.className = 'holdingDiv'
    draggedLtr.classList.remove('invisible')
}

function onBodyDrop(event){
    let ltr = document.getElementById(mvdLtr)
    ltr.classList.remove('invisble')
    console.log('triggered')
}

function returnDrop(event){
    event.preventDefault()
    ltr = document.getElementById(mvdLtr)
    ltr.classList.remove('invisible')
    ltr.className = 'ltr'
    ltr.parentNode.append(ltr)
    console.log('got to return drop')
    return false
}

function returnDrag(event){
    event.preventDefault()
    return false
}



//displays letters and boxes to receive letters
 function dsplWrd(word){ 
    // displays letters
    for(let i = 0; i < word.length; i++){
        holdingDiv = document.createElement('div')
        holdingDiv.className = "holdingDiv"
        newDiv = document.createElement('div')
        newDiv.className = 'ltr'
        newDiv.id = 'sl'+i
        newDiv.setAttribute("ondrag", "onDragStart(event)")
        newDiv.addEventListener('onDrag', onDragStart)
        newDiv.draggable="true"
        newDiv.innerHTML = word[i]
        holdingDiv.append(newDiv)
        ltrs.append(holdingDiv)
    }

    //receives letters
    for(let i = 0; i < word.length; i++){
        newDiv = document.createElement('div')
        newDiv.className = 'word'
        newDiv.innerHTML = ""
        newDiv.id = 'll'+i
        newDiv.setAttribute('ondragover', 'onDragOver(event)')
        newDiv.setAttribute('ondrop', 'onDrop(event)')
        wrd.append(newDiv)
    }
}

//shuffles letters of incoming word
let shuffle = function(word){
    let arr = word.split(""),
    len = arr.length;

    for (let i = len -1; i > 0; i--){
        let slctNum = Math.floor(Math.random() * (i + 1))
        let tmp = arr[i]
        arr[i] = arr[slctNum]
        arr[slctNum] = tmp
    }
    return arr.join("")
}





dsplWrd(shuffle(jungle[arrPos].name))

