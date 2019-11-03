//constants

// state variables
let arrPos = 0
let mvdLtr = ""
let orgParent
let scene = 'mountain'
let currentWord
// let currentArrayPosition 


// cached elements 
let ltrs = document.getElementById('letters')
let wrd = document.getElementById('word')
let bdy = document.querySelector('body')
let shuffleBtn = document.getElementById('shfl')
let hintBtn = document.getElementById('hnt')
let nextBtn = document.getElementById('nxtWord')




// data structures
let world ={mountain: [
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
        // let jungle = [{name: 'MONKEY', photo: null, funFact: null}]
        
       
        
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
    let guessedWord = ""
    let guessedLetters = document.querySelectorAll('.droppedLtr')
    console.log(guessedLetters)
    console.log(guessedLetters[0].id[0])
    for(let i = 0; i < guessedLetters.length; i++){
        guessedWord += guessedLetters[i].id[0]
        console.log('gsd wrd:' + guessedWord)
    }
    if (guessedWord === currentWord){
        console.log('you got it!')
        let pic = document.getElementById('animalPic')
        let array = getArray(scene)
        console.log(array[arrPos].photo)
        pic.src = array[arrPos].photo
    }
    console.log("got here: " + guessedLetters)
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
    var data = event.dataTransfer.getData('text')
    console.log('we got: ', data)
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
    ltr.className = 'droppedLtr'
    ltr.parentNode.append(ltr)
    ltr.parentNode.className = 'holdingDiv'
    console.log('got to return drop')
    hasWon()
    return false
}

function returnDrag(event){
    event.preventDefault()
    return false
}

function clearWord(){
    ltrs.innerHTML = ""
    wrd.innerHTML = ""
}

//displays letters and boxes to receive letters
 function dsplWrd(word){ 
    // displays letters
    for(let i = 0; i < word.length; i++){
        holdingDiv = document.createElement('div')
        holdingDiv.className = "holdingDiv"
        // newDiv = document.createElement('div')
        img = document.createElement('img')
        img.src = `assets/Alphabet/${word[i]}.png`
        img.className = 'ltr'
        img.id = word[i]+i
        // newDiv.setAttribute('dragstart', "storeData(event)")
        img.setAttribute("ondrag", "onDragStart(event)")
        img.addEventListener('onDrag', onDragStart)
        img.draggable="true"
        // newDiv.innerHTML = word[i]
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

function renderWord(scene, pos){
    array = getArray(scene)
    word = array[pos].name
    currentWord = word
    console.log(array)
    let scrambledWrd = shuffle(word)
    dsplWrd(scrambledWrd)
}

// function nextAnimal(){
//     console.log('got to next animal')
//     console.log(getArray(scene))
//     if(arrPos < getArray(scene).length){
//         renderWord(scene, arrPos+1)
//     }else{
//         console.log('finished scene')
//     }


 // event listeners
 nextBtn.addEventListener('click', function(){
     console.log('I got clicked!')
     clearWord()
     if(arrPos < getArray(scene).length){
         arrPos+= 1
        renderWord(scene, arrPos)
    }else{
        console.log('finished scene')
    }
 })

function init(){
    clearWord()
    let btnHolder = document.getElementById('buttonHolder')
    btnHolder.addEventListener('click', function(evt){

        scene = evt.target.id
        let sceneArr = getArray(scene)
        renderWord(scene, 0)
        console.log(sceneArr)
    })
    //get scene array
    //get word
    //make scrambled word
    //display letters and empty slots


}


init()

// dsplWrd(shuffle(world.jungle[arrPos].name))

