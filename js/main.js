// data structures
let world ={
    mountain: [
        {name: 'COUGAR', photo: 'assets/Animals/cougar-718092_640.jpg', funFact: 'This daunting large cat cannot roar. Instead it purrs like a house cat.'},
        {name: 'EAGLE', photo:'assets/Animals/bald-eagle-2190424_640.jpg', funFact: 'Unlike humans who see three basic colors, Eagles can see five basic colors and detect UV light.',},
        {name: 'MOOSE', photo:'assets/Animals/moose-70254_640.jpg', funFact: 'Despite their great bulk, moose are very comfortable in water and have been seen swimming for several miles at a time and will dive more than 16 feet to get food.',},
        {name: 'BEAR', photo:'assets/Animals/bear-1245807_640.jpg', funFact:'When a bear hibernates their heart slows from 55 beats per minute to 9 beats per minute.',},
        {name: 'BEAVER', photo:'assets/Animals/nutria-1386446_640.jpg', funFact: 'These semi-aquatic animals have a set of transparent eyelids which let them see under water.',},
        {name:'COYOTE', photo:'assets/Animals/coyote-1901990_640.jpg', funFact:'Excellent runners, Coyotes can run up to 40 miles per hour and jump over 13 feet at a time.',},
        {name:'SQUIRREL', photo:'assets/Animals/squirrel-1407699_640.jpg', funFact: 'Not only do these little animals store vast amounts of food for later, they create elaborate fake burials in the process to trick any potential thieves.',},
        {name: 'OSPREY', photo:'assets/Animals/osprey-67786_640.jpg', funFact:'Female osprey are generally 20% heavier than males and have a wingspan 5-10% greater.',},],
    savanna: [
        {name: 'CHEETAH', photo: 'assets/Animals/cheetah-2859581_640.jpg', funFact: 'Known as the fastest land animal, these creatures use their tale to steer themselves while running.'},
        {name: 'WILDEBEEST', photo:'assets/Animals/wildebeest-322088_640.jpg', funFact:'Always in search for more grazing lands, some wildebeests travel up to a 1,000 miles a year.',},
        {name:'ANTELOPE', photo:'assets/Animals/antelope-425161_640.jpg', funFact: 'Antelopes that live in herds have glands in their hooves that leave a scent wherever they walk. If one of thier members gets separated it can follow the scent back to the heard.',},
        {name: 'ELEPHANT', photo:'assets/Animals/elephant-111695_640.jpg', funFact:'Despite their tough looking skin, elephants are susceptible to sunburn. They give themselves and their children dirt baths to protect their skin from the sun\'s rays.',},
        {name:'WARTHOG', photo:'assets/Animals/warthog-2818953_640.jpg', funFact: 'The bumpy patches on a warthog\'s face are not actuall warts as their name implies. They are thick patches of skin which provide padding for adualt males when they fight during mating season.',},
        {name:'RHINOCEROS', photo:'assets/Animals/rhino-4555707_640.jpg', funFact:'Rhinoceros have no known predators but despite this they are easily frightened. When they feel threatend they will charge whatever spooked them.',},
        {name:'ZEBRA', photo:'assets/Animals/zebra-3758310_640.jpg', funFact:'Zebra\'s black and white stripes cause air to move across it\s fur at different speeds thus cooling down the Zebra.',},
        {name:'GAZELLE', photo:'assets/Animals/gazelle-2242886_640.jpg', funFact:'Large herds of these animals are generally female gazelle\'s and their offspring. Male gazelles live in seperate heards.',},],
    jungle: [
        {name: "MONKEY", photo: 'assets/Animals/monkeys-4550159_640.jpg', funFact: 'At the tip of a monkey\'s tail is a patch of bare skin that acts similar to human fingertips. It is sensitive to touch and has tiny ridges that help it\'s tail grip better.'},
        {name: 'MACAW', photo:'assets/Animals/macaw-1817586_640.jpg', funFact:'These colorful animals live long lives - up to 60 years in the wild.',},
        {name: 'ANTEATER', photo:'assets/Animals/flag-anteater-1200155_640.jpg', funFact:'In order to avoid being bitten by ants while eating them, anteaters flick their tongue 150-160 times a minute while feeding.',},
        {name:'IGUANA', photo:'assets/Animals/iguana-223157_640.jpg', funFact:'Green iguanas are tough. They can drop from a branch 40 feet in the air, hit the ground, and still survive.',},
        {name:'ANACONDA', photo:'assets/Animals/anaconda-600096_640.jpg', funFact:'Female green anacondas are the larger sex in this species, and have been observed eating meeker males, generally during mating season.',},
        {name: 'SLOTH', photo:'assets/Animals/sloth-1879999_640.jpg', funFact:'These animals urinate and deficate only once a week and always in the same place.',},
        {name:'JAGUAR', photo:'assets/Animals/animal-2607_640.jpg', funFact:'Not afraid of water, Jaguar\'s are known to swim across the Panama Canal.',},
        {name:'GORILLA', photo:'assets/Animals/gorilla-3606721_640.jpg', funFact: 'Gorillas have a bite force of around 1300psi - twice that of a lion.',},
        ]}

// state variables
let mvdLtr = ""
let orgParent
let scene = 'mountain'
let currentWord
let points = 0
let totalCompleted = 0
let newGame = true
let time = 9000
let findingWord
let mvdLtrParent = ""

// cached elements 
let ltrs = document.getElementById('letters')
let wrd = document.getElementById('word')
let bdy = document.querySelector('body')
let shuffleBtn = document.getElementById('shfl')
let hintBtn = document.getElementById('hnt')
let nextBtn = document.getElementById('nxtWord')
let globe = document.querySelector('.menuGlobe')
let displayPic = document.querySelector('.displayPic')
let alertBtn = document.querySelector('.close')
let flipableButtons = [nextBtn, hintBtn, shuffleBtn]
let btnHolder = document.getElementById('buttonHolder')

// event listeners
btnHolder.addEventListener('click', startRender)
nextBtn.addEventListener('click', nextAnimal)
shuffleBtn.addEventListener('click', ()=> renderWord(shuffle(world[scene][totalCompleted].name)))
hintBtn.addEventListener('click', giveHint)
globe.addEventListener('click', toSceneSelector)
alertBtn.addEventListener('click', closeAlert)

// events related to dragging and dropping
// saves variable's id and its parent's id when started moving
function onDragStart(event){
    id = event.target.id
    mvdLtr= event.target.id

    mvdLtrParent = event.target.parentNode.id
    event.target.className = 'invisible'
    if(event.target.parentNode.id[0] ==='l'){
        event.target.parentNode.className = 'word';
    } 
}

// prevents default when dragged over
function onDragOver(event) {
    event.preventDefault()
}

//when element dropped on div, the div attaches the element to itself
function onDrop(event) {
    event.preventDefault()
    const draggedLtr = document.getElementById(mvdLtr) 
    draggedLtr.AllowDrop = false
    const wrdHolder = document.getElementById(event.target.id)
    draggedLtr.className = 'ltr'
    wrdHolder.appendChild(draggedLtr)
    wrdHolder.className = 'holdingDiv'
    draggedLtr.classList.remove('invisible')
}
    
// if letter dropped on element it is returned to origin and made visible
function returnDrop(event){
    event.preventDefault()
    ltr = document.getElementById(mvdLtr)
    ltr.classList.remove('invisible')
    ltr.className = 'droppedLtr'
    if(event.target.id[0] !== "l"){
        let parent = document.getElementById(mvdLtrParent)
        parent.append(ltr)
    }
    parent.className = 'holdingDiv'

    hasWon()
    return false
}

// prevents default if dragged over and returns false
function returnDrag(event){
    event.preventDefault()
    return false
}

// closes alert
function closeAlert(){
    renderPicture("?", false)
}

// displays scene selection and prepares for a new game
function toSceneSelector(){
    togglePages('.world', '.bigNet')
    newGame = true
    renderNewScene()
}

//provides user with a letter in the correct position
function giveHint(){
    //get remaining ltrs left to choose from
    let ltrList = document.querySelectorAll('.ltr')
    //get random number with which to select hint letter
    let rndmNumber = Math.floor(Math.random() * Math.floor(ltrList.length))
    //select the letter to hint
    let hintLetter = ltrList[rndmNumber].id[0]
    //get the element of hint letter
    let hintLetterElem = document.getElementById(ltrList[rndmNumber].id)
    hintLetterElem.className = 'droppedLtr'
    //get current array
    let curArray = world[scene]
    //get animalName
    let animalName = curArray[totalCompleted].name
    //create an array of positions of hintLetter
    let locOfLetter = []
    for(let i = 0; i < animalName.length; i++){
        if(animalName[i] === hintLetter){
            locOfLetter.push(i)
        }
    }

    let locOfLetterPos = 0
    let destinationLoc = document.getElementById('word').childNodes[locOfLetter[locOfLetterPos]]
    //check to see if destinationLoc already has a letter. If it does, try a position or return wrong letter to selection options
    if(destinationLoc.hasChildNodes()){
        while(destinationLoc.hasChildNodes()){
            if((destinationLoc.firstChild.id[0]) === hintLetter){
                locOfLetterPos += 1
                destinationLoc = document.getElementById('word').childNodes[locOfLetter[locOfLetterPos]]
            }else{
                let wrongLetter = document.getElementById(destinationLoc.firstChild.id)
                wrongLetter.className = 'ltr'
                hintLetterElem.parentNode.appendChild(wrongLetter)
            }
        }
    }
    if(!destinationLoc.hasChildNodes()){
        destinationLoc.appendChild(hintLetterElem)
        destinationLoc.className= 'holdingDiv'
    }
    time -= 5
    hasWon()
}

// proceeds to next animal in array. Congrats user if scene is completed.
function nextAnimal(){
    flipButtons(hintBtn, shuffleBtn, nextBtn)
    renderPicture("?", false)
     clearWord()
     if(totalCompleted < world[scene].length){
         time = 45
         findingWord = true
        renderWord()
    }else{
        let congrats = `<span class = 'warning' id = 'win'>Congratulations! You finished the ${scene} animals. <br> You earned ${points} points.<button class = 'close'>x</button></button></span>`
        
        renderAlert(congrats)
        setTimeout(()=> { 
            newGame = true

            togglePages('.world', '.bigNet')
            renderNewScene()
        }, 3*1000)
    }
}

//progress functions
// calculate points based upon time remaining
function calculatePoints(){
    switch (true) {
        case (time<15):
            points+=1
            break;
        case (time<30):
            points+=2
            break;
        case (time<45):
            points+=3
            break;

    }
    updateProgress('pnts', `Points: ${points}`)
}

//decrements as user is playing. Stops game if user runs out of time. 
function timer() {
    const int = setInterval(function() {
        if(findingWord && time >= 0){
            if (time === 0){
                let timeAlert = `<span class = 'warning'>You ran out of time!<button class = 'close'>x</button></button></span>` 
                
                renderAlert(timeAlert)
                draggableLetters(false)
                clearInterval(int)
                setTimeout(() => {
                    time = 45
                    newGame = true
                    
                    timer(time)
                    draggableLetters(true)
                    closeAlert()
                    renderNewScene()
                },3000)
                return
            }else{
                time-=1
                let min = Math.floor(time/60)
                let sec = time - (min*60)
                document.getElementById('timer').innerHTML = `${sec}`|| clearInterval(int)
            }
        }
    }, 1000)

}

// toggles letter between draggable or not depending upon provided boolean
function draggableLetters(bool){
    let ltrs = document.querySelectorAll('.ltr')
    ltrs.forEach(function(ltr){ ltr.draggable = bool})
    let droppedLtrs = document.querySelectorAll('.droppedLtr')
    droppedLtrs.forEach(function(ltr){ ltr.draggable = bool})
}
        

// game functions
// verifies if user order letters correctly
function hasWon(){
    let guessedWord = ""
    let guessedLetters = document.querySelectorAll('.droppedLtr')
    for(let i = 0; i < guessedLetters.length; i++){
        guessedWord += guessedLetters[i].id[0]
    }
    if (guessedWord === currentWord){
        findingWord = false
        totalCompleted+=1

        flipButtons(hintBtn, shuffleBtn)
        updateProgress('prgrs', `${totalCompleted}/${world.mountain.length}`)
        renderPicture('', true)
        calculatePoints()
        setTimeout(displayFunFact, 1.5*1000)
    }else if(guessedWord.length === currentWord.length){
        let tryAgain = `<span class = 'warning'>Oops. Try again.<button class = 'close'>x</button></button></span>`
        time += 20
        renderAlert(tryAgain)
        clearWord()
        dsplWrd(shuffle(currentWord))
        setTimeout(closeAlert, 3000)
    }
}

// displays fun fact
function displayFunFact(){
    flipButtons(nextBtn)
    let funFactDisp = world[scene][totalCompleted-1].funFact
    displayPic.innerHTML = `<span id = 'fnFact' >${funFactDisp}</span>`
}

// clears letters from screen
function clearWord(){
    ltrs.innerHTML = ""
    wrd.innerHTML = ""
}

// shuffles and displays the letters on screen
function renderWord(){
    findingWord = true
    currentWord = world[scene][totalCompleted].name
    dsplWrd(shuffle(currentWord))
}

//displays letters and boxes to receive letters
function dsplWrd(word){ 
   // displays letters
   for(let i = 0; i < word.length; i++){
       holdingDiv = document.createElement('div')
       holdingDiv.className = "holdingDiv"
       holdingDiv.id = "hd" + i
       img = document.createElement('img')
       img.src = `assets/Alphabet/${word[i]}.png`
       img.className = 'ltr'
       img.id = word[i]+i
       img.setAttribute("ondrag", "onDragStart(event)")
       img.setAttribute("ondrop", "returnDrop(event)")
       img.setAttribute("ondragover", "returnDrag(event)")
       img.addEventListener('onDrag', onDragStart)
       img.draggable="true"
       holdingDiv.append(img)
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

// shuffles letters
function shuffle(word){
    clearWord()
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

// renders alert
function renderAlert(alert){
    displayPic.innerHTML = alert
}

// renders picture
function renderPicture(innerHTML, foundWord){
    if(foundWord){
        displayPic.className = 'displayFact'
        displayPic.style.backgroundImage = `url(${world[scene][totalCompleted-1].photo})`
        displayPic.innerHTML = innerHTML
    }else{
        let grayBackground = "https://www.transparenttextures.com/patterns/45-degree-fabric-light.png"
        displayPic.style.backgroundImage = `url(${grayBackground})`
        displayPic.className = 'displayPic'
        displayPic.innerHTML = innerHTML
    }

}

// calls functions to render game
function startRender(evt){
    newGame = false
    scene = evt.target.id

    clearWord()
    togglePages('.bigNet', '.world')
    updateProgress('prgrs', `${totalCompleted}/${world[scene].length}`)
    renderWord()
}

// updates visible variables tracking game progress
function updateProgress(id, innerHTML){
    let elem = document.getElementById(id)
    elem.innerHTML = innerHTML
}

// calls functions to render a scene
function renderNewScene(){
     togglePages('.world', '.bigNet')
     clearWord()

     if(newGame){
         points = 0
         totalCompleted = 0
         time = 9000
         newGame = false

        renderPicture("?", false)
        renderWord()
     }

     updateProgress('pnts', `Points: ${points}`)
 }

//  switches visibility between pages
function togglePages(on, off){
    let visibleScene = document.querySelector(on)
    visibleScene.style.display = 'flex'
    let hiddenScene = document.querySelector(off)
    hiddenScene.style.display = 'none'
}

// starts game
function init(){
    timer(time)
    flipButtons(nextBtn)
    renderNewScene()


}

// flips buttons disabled property
function flipButtons(...args) {
    args.forEach(item => item.disabled = !item.disabled)
}

init()

