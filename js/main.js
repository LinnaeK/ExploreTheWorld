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
        {name:'JAGUAR', photo:'assets/Animals/animal-2607_640.jpg', funFact:'Not afraid of water, Jaguar\'s are known to swim across teh Panama Canal.',},
        {name:'GORILLA', photo:'assets/Animals/gorilla-3606721_640.jpg', funFact: 'Gorillas have a bite force of around 1300psi - twice that of a lion.',},
        ]}

//constants

// state variables
let mvdLtr = ""
let orgParent
let scene = 'mountain'
let currentWord
let points = 0
let totalCompleted = 0
let newGame = true
let time = 45
let findingWord

// cached elements 
let ltrs = document.getElementById('letters')
let wrd = document.getElementById('word')
let bdy = document.querySelector('body')
let shuffleBtn = document.getElementById('shfl')
let hintBtn = document.getElementById('hnt')
let nextBtn = document.getElementById('nxtWord')

        
function timer() {
    var int = setInterval(function() {
        if(findingWord && time >= 0){
            if (time === 0){
                console.log('reached 0')
                newGame = true
                renderNewScene()
                return
            }
            time-=1
            let min = Math.floor(time/60)
            let sec = time - (min*60)
            document.getElementById('timer').innerHTML = `${min}:${sec}`|| clearInterval(int)
        }
    }, 1000)

}
        
function getArray(scene){
    let arry
    switch(scene){
    case 'mountain':
        arry = world.mountain
        break
    case 'savanna':
        arry = world.savanna
        break
    case 'jungle':
        arry = world.jungle
        break
    }
    return arry;
}


function hasWon(){
    console.log(newGame)
    let guessedWord = ""
    let guessedLetters = document.querySelectorAll('.droppedLtr')
    // console.log(guessedLetters[0].id[0])
    for(let i = 0; i < guessedLetters.length; i++){
        guessedWord += guessedLetters[i].id[0]
    }
    if (guessedWord === currentWord){
        shuffleBtn.disabled = true
        hintBtn.disabled = true
        calculatePoints()
        findingWord = false
        let array = getArray(scene)
        let holder = document.querySelector('.displayPic')
        holder.className = 'displayFact'
        let picURL = array[totalCompleted].photo
        console.log(picURL)
        holder.style.backgroundImage = `url(${picURL})`
        holder.innerHTML = ""
        setTimeout(displayFunFact, 5*1000)
        totalCompleted+=1
        let progressBar = document.getElementById('prgrs')
        progressBar.innerHTML = `${totalCompleted}/${world.mountain.length}`
        // pic.src = array[arrPos].photo
    }else if(guessedWord.length === currentWord.length){
        clearWord()
        dsplWrd(shuffle(currentWord))
    }
}

function displayFunFact(){
    nextBtn.disabled = false
    let displayPic = document.querySelector('.displayFact')
    let funFactDisp = getArray(scene)[totalCompleted-1].funFact
    displayPic.innerHTML = `<span id = 'fnFact' >${funFactDisp}</span>`
    // displayPic.style.opacity = '0.6'
}

function calculatePoints(){
    console.log('got to calculate points')
    console.log(typeof(time))
    switch (true) {
        case (time<15):
            console.log('<15')
            points+=1
            break;
        case (time<30):
            console.log('<30')
            points+=2
            break;
        case (time<45):
            console.log('<45')
            points+=3
            break;

    }
    console.log(points)
    let pointCounter = document.getElementById('pnts')
    pointCounter.innerHTML = `Points: ${points}`
}

function storeData(event){
    event.dataTransfer.setData('text', event.target.id)
}

//drag and drop functions
let onDragStart = function(event){
    id = event.target.id
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
    // var data = event.dataTransfer.getData('text')
    // console.log('we got: ', data)
    // console.log('I tried this: ' + id)
    const draggedLtr = document.getElementById(mvdLtr) 
    draggedLtr.AllowDrop = false
    const wrdHolder = document.getElementById(event.target.id)
    draggedLtr.className = 'ltr'
    wrdHolder.appendChild(draggedLtr)
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
    ltr.className = 'droppedLtr'
    ltr.parentNode.append(ltr)
    ltr.parentNode.className = 'holdingDiv'
    hasWon()
    return false
}

function returnDrag(event){
    event.preventDefault()
    return false
}

function clearWord(){
    console.log('cleared word')
    ltrs.innerHTML = ""
    wrd.innerHTML = ""
}

//displays letters and boxes to receive letters
 function dsplWrd(word){ 
     console.log('got to dsplword')
    // displays letters
    for(let i = 0; i < word.length; i++){
        holdingDiv = document.createElement('div')
        holdingDiv.className = "holdingDiv"
        img = document.createElement('img')
        img.src = `assets/Alphabet/${word[i]}.png`
        img.className = 'ltr'
        img.id = word[i]+i
        img.setAttribute("ondrag", "onDragStart(event)")
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

function renderWord(){
    findingWord = true
    array = getArray(scene)
    word = array[totalCompleted].name
    currentWord = word
    let scrambledWrd = shuffle(word)

    dsplWrd(scrambledWrd)
}

function reShuffle(){
    clearWord()
    renderWord()
}

shuffleBtn.addEventListener('click', reShuffle)
hintBtn.addEventListener('click', giveHint)

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
    let curArray = getArray(scene)
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
            console.log('destination loc check started: '+ locOfLetter, locOfLetterPos)
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
    }
    hasWon()
}

function nextAnimal(){
    nextBtn.disabled = true
    hintBtn.disabled = false
    shuffleBtn.disabled = false
    console.log('In next animal: ' + totalCompleted)
    let displayPic = document.querySelector('.displayFact')
    displayPic.style.opacity = '1'
    displayPic.innerHTML = '?'
    displayPic.className = 'displayPic'
    let grayBackground = "https://www.transparenttextures.com/patterns/45-degree-fabric-light.png"
    displayPic.style.backgroundImage = `url(${grayBackground})`
    displayPic.style.backgroundColor = '#79807e';
     clearWord()
     if(totalCompleted < getArray(scene).length){
         time = 45
         findingWord = true
        //  totalCompleted+= 1
        renderWord()
    }else{
        let playScene = document.querySelector('.bigNet')
        playScene.style.display = 'none'
        let sceneSelector = document.querySelector('.world')
        sceneSelector.style.display = 'flex'
        newGame = true
        renderNewScene()
        console.log('finished scene')
    }
}


 // event listeners
 nextBtn.addEventListener('click', nextAnimal)

 function renderNewScene(){
     clearWord()
     if(newGame){
         console.log('new game '+newGame)
        points = 0
        totalCompleted = 0
        time = 45
        console.log(scene)
        let sceneArr = getArray(scene)
        let progress = document.getElementById('prgrs')
        console.log(prgrs)
        progress.innerHTML = `${totalCompleted}/${sceneArr.length}`
        newGame = false
        renderWord()
     }

    let pointCounter = document.getElementById('pnts')
    pointCounter.innerHTML = `Points: ${points}`

    
    let btnHolder = document.getElementById('buttonHolder')
    btnHolder.addEventListener('click', function(evt){
        clearWord()
        let sceneSelector = document.querySelector('.world')
        sceneSelector.style.display = 'none'
        let playScene = document.querySelector('.bigNet')
        playScene.style.display = 'flex'
        newGame = false
        scene = evt.target.id
        let sceneArr = getArray(scene)
        let progress = document.getElementById('prgrs')
        console.log(prgrs)
        progress.innerHTML = `${totalCompleted}/${sceneArr.length}`
        renderWord()
    })

 }

function init(){
    timer(time)
    let playScene = document.querySelector('.bigNet')
    playScene.style.display = 'none'
    nextBtn.disabled = true
    renderNewScene()
    
    
    //get scene array
    //get word
    //make scrambled word
    //display letters and empty slots


}


init()

// dsplWrd(shuffle(world.jungle[arrPos].name))

