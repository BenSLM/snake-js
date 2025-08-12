const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")

let gameOver = false;
let foodX, foodY;
let snakeX =15, snakeY =15;
let snakeBody = []; // Array para almacenar los segmentos del cuerpo, que tambien seran arrays (matriz)
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;

highScoreElement.innerHTML = `High Score: ${highScore}`


// Funcion para generar posicion aleatoria de la comida
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Funcion que controla la dirección con teclado
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game Over")
    location.reload()
}

//Funcion principal que inicia el juego
const initGame = () => {
    if (gameOver) {
        return handleGameOver()
    }
    
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    
    //Detecta la colision de cabeza con manzanita
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push([foodX, foodY]) //Añade nuevo segmento al cuerpo
        score++;

        highScore = score >= highScore ? score: highScore;
        
        localStorage.setItem("high-score", highScore);

        scoreElement.innerHTML = `Score: ${score}`
        highScoreElement.innerHTML = `High Score: ${highScore}`
    }


    // Mueve cada segmento a la posicion del anterior (excepto la cabeza)
    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1] // El segmento actual toma la posición del anterior
    }

    snakeBody[0] = [snakeX, snakeY]


    // Mueve la cabeza según la dirección
    snakeX += velocityX // Cordenada x = 15 -1 = 14
    snakeY += velocityY // Cordenada y = 15 -1 = 14
    
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    //Dibuja el cuerpo
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }


    // Inserta el HTML generado en el tablero
    playBoard.innerHTML = htmlMarkup
}


changeFoodPosition();
// initGame();

setIntervalId = setInterval(initGame, 85)

document.addEventListener("keydown", changeDirection)