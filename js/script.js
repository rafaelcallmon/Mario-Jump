const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameOverBox = document.querySelector('.game-over');
const scoreBox = document.querySelector('.score-box');
const finalScore = document.querySelector('.final-score');
const btnRestart = document.querySelector('.restart');
const highScoreBox = document.querySelector('.high-score-box')

let loop
let score = 0
let alreadyScored = false
let highScore = 0

const removeJump = () => {
    mario.classList.remove('jump');
}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(removeJump, 500)
}

function startGame() {
    loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.classList.add('paused');
        pipe.style.left = `${pipePosition}px`;

        mario.classList.add('paused');
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './imagens/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        clouds.classList.add('paused');
        clouds.style.left = `${cloudsPosition}px`

        gameOverBox.classList.add('active');
        finalScore.innerHTML = `SCORE: ${score} `

        if (score > highScore) {
            highScoreBox.innerHTML = `High Score: ${score}`
            highScore = score
        }
        

        clearInterval(loop);
    }

    if (pipePosition < 0 && !alreadyScored) {
        score ++
        scoreBox.innerHTML = `Score: ${score}`
        alreadyScored = true
    }

    if (pipePosition > 500) {
        alreadyScored = false;
    }

    }, 10);
}

const restartGame = () => {
    gameOverBox.classList.remove('active');

    mario.classList.remove('paused');
    mario.src = './imagens/mario.gif'
    mario.style.width = '150px'
    mario.style.bottom = ''
    mario.style.marginLeft = ''

    clouds.style.left = ''
    clouds.classList.remove('paused');

    pipe.classList.remove('paused');
    pipe.offsetHeight
    pipe.style.left = ''

    score = 0
    alreadyScored = false
    scoreBox.innerHTML = `Score: 0`

    startGame()
    
}

document.addEventListener('keydown', jump);

btnRestart.addEventListener('click', restartGame)

startGame()