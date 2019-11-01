// data structures
let jungle = [{name: 'MONKEY', photo: null, funFact: null}]


// cached elements 
let ltrs = document.getElementById('letters')
let wrd = document.getElementById('word')
let bdy = document.querySelector('body')

// global variables
let arrPos = 0
let world = 'jungle'
let mvdLtr = ""

// event listeners
// let slctdLtr = bdy.addEventListener('click', handleLtr)

let onDragStart = function(event){
    mvdLtr= event.target.id
    event.target.className = 'invisible'
}

let onDragOver = function(event) {
    event.preventDefault()
}

let onDrop = function(event) {
    event.preventDefault()
    const draggedLtr = document.getElementById(mvdLtr) 
    const wrdHolder = document.getElementById(event.target.id)
    wrdHolder.appendChild(draggedLtr)
    draggedLtr.classList.remove('invisible')
}


 function dsplWrd(word){ 
    // displays letters
    for(let i = 0; i < word.length; i++){
        newDiv = document.createElement('div')
        newDiv.className = 'ltr'
        newDiv.id = 'sl'+i
        newDiv.setAttribute("ondrag", "onDragStart(event)")
        newDiv.addEventListener('onDrag', onDragStart)
        newDiv.draggable="true"
        newDiv.innerHTML = word[i]
        ltrs.append(newDiv)
    }


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

