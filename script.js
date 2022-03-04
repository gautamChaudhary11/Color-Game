const lowerRow = document.querySelector('.lowerRow');
const upperRow = document.querySelector('.upperRow');
var ting = new Audio("./ting.mp3");
var winningAudio = new Audio("./gameover.mp3");
let ansRed, ansGreen, ansBlue;
let isEasy = 1, ansGrid, attempts = 0;
// At the very beginning....
function makeAllVisible() {
    for(let i = 1; i <= 6; i++) {
        const item = document.querySelector(`.item${i}`);
        item.style.display = "flex";
        if(item.classList.contains('afterWin')) {
            item.classList.remove('afterWin');
        }
        if(!item.classList.contains('grid-item')) item.classList.add('grid-item');
        if(item.classList.contains('deleteBox')) item.classList.remove('deleteBox');
        
    }
}
function beginEasy() {
    isEasy = 1;
    attempts = 0;
    makeAllVisible();
    lowerRow.style.display = "none";
    const arr = generateColor(0, 255);
    ansRed = arr[0];
    ansGreen = arr[1];
    ansBlue = arr[2];
    // Randomly select which grid must have the correct answer
    if(isEasy) {
        ansGrid = generateRandomGrid(1, 3);
    } else {
        ansGrid = generateRandomGrid(1, 6);
    }
    assignColor();
    createHeading();
}
function beginHard() {
    isEasy = 0;
    attempts = 0;
    makeAllVisible();
    lowerRow.style.display = "flex";
    const arr = generateColor(0, 255);
    ansRed = arr[0];
    ansGreen = arr[1];
    ansBlue = arr[2];
    // Randomly select which grid must have the correct answer
    if(isEasy) {
        ansGrid = generateRandomGrid(1, 3);
    } else {
        ansGrid = generateRandomGrid(1, 6);
    }
    assignColor();
    createHeading();
}
beginEasy();

// Create the new Heading.
function createHeading() {

    document.querySelector('.head').style.background = `rgb(${ansRed}, ${ansGreen}, ${ansBlue})`;

    document.querySelector('.red').innerText = `${ansRed}`;
    document.querySelector('.green').innerText = `${ansGreen}`;
    document.querySelector('.blue').innerText = `${ansBlue}`;
}
// Generator of R B C

function generateColor(min, max) { // min and max included 
    const R = Math.floor(Math.random() * (max - min + 1) + min);
    const G = Math.floor(Math.random() * (max - min + 1) + min);
    const B = Math.floor(Math.random() * (max - min + 1) + min);

    const arr = [R, G, B];
    return arr;
}

// Generate answer grid
function generateRandomGrid(min, max) {
    const x = Math.floor(Math.random() * (max - min + 1) + min);
    return x;
}


// See if Easy is pressed or hard is pressed
document.querySelector('.easy').addEventListener('click', () => {
    beginEasy();
})

document.querySelector('.hard').addEventListener('click', () => {
    beginHard();
})

// See if New Colors is pressed
document.querySelector('.newColorButton').addEventListener('click', () => {
    if(isEasy) {
        beginEasy();
    } else {
        beginHard();
    }
})


// Assign Color values to each of the grid items

function check(arr1, arr2) {
    let poss = true;
    for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] != arr2[i]) {
            poss = false;
        }
    }
    return poss;
}

function assignColor() {
    if(isEasy) {
        for(let i = 1; i <= 3; i++) {
            if(i != ansGrid) {
                const arr = generateColor(0, 255);
                const orig = [ansRed, ansGreen, ansBlue];
                while(check(arr, orig)) {
                    arr = generateColor(0, 255);
                }
                document.querySelector(`.item${i}`).style.background = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
            } else {
                document.querySelector(`.item${i}`).style.background = `rgb(${ansRed}, ${ansGreen}, ${ansBlue})`;
            }
        }
    } else {
        for(let i = 1; i <= 6; i++) {
            if(i != ansGrid) {
                const arr = generateColor(0, 255);
                const orig = [ansRed, ansGreen, ansBlue];
                while(check(arr, orig)) {
                    arr = generateColor(0, 255);
                }
                document.querySelector(`.item${i}`).style.background = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
            } else {
                document.querySelector(`.item${i}`).style.background = `rgb(${ansRed}, ${ansGreen}, ${ansBlue})`;
            }
        }
    }
}



// Check if the correct grid item is selected

document.querySelector('.gamingGrid').addEventListener('click', (e) => {
    if(e.target.classList.contains('grid-item')) {
        attempts++;
        if(e.target.classList[0] === `item${ansGrid}`) {
            win();
        } else {
            lose(e.target);
        }
    }
});

function win() {
    sendWinMessage();
    winningAudio.play();
    if(isEasy) {
        for(let i = 1; i <= 3; i++) {
            const item = document.querySelector(`.item${i}`);
            if(item.classList.contains('grid-item')) item.classList.remove('grid-item');
            if(item.classList.contains('deleteBox')) item.classList.remove('deleteBox');
            item.classList.add('afterWin');
        }

        for(let i = 1; i <= 3; i++) {
            const item = document.querySelector(`.item${i}`);
            item.style.display = "flex";
            item.style.background = `rgb(${ansRed}, ${ansGreen}, ${ansBlue})`;
        }
    } else {
        for(let i = 1; i <= 6; i++) {
            const item = document.querySelector(`.item${i}`);
            if(item.classList.contains('grid-item')) item.classList.remove('grid-item');
            if(item.classList.contains('deleteBox')) item.classList.remove('deleteBox');
            item.classList.add('afterWin');
        }
        for(let i = 1; i <= 6; i++) {
            const item = document.querySelector(`.item${i}`);
            item.style.display = "flex";
            item.style.background = `rgb(${ansRed}, ${ansGreen}, ${ansBlue})`;
        }
    }
}

function lose(element) {
    ting.load();
    ting.play();
    setTimeout(() => {
        element.classList.add('deleteBoxAnimate');
        setTimeout(() => {
            element.classList.remove('grid-item');
            element.classList.remove('deleteBoxAnimate');
            element.classList.add('deleteBox');
        }, 200);
    }, 0);
}

// Creates a win message

function sendWinMessage() {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class = "success append">You Won in ${attempts} attempts!! </div>`;
    const gameContainer = document.querySelector('.gameContainer');
    const gamingGrid = document.querySelector('.gamingGrid');
    gameContainer.insertBefore(newDiv, gamingGrid);
    setTimeout(() => {
        document.querySelector('.success').classList.remove('append');
        document.querySelector('.success').classList.add('delete');
        setTimeout(() => document.querySelector('.success').remove(), 300);
    }, 3000)
}