const playBoard = document.querySelector(".play-board")

let foodX;
let foodY;
let snakeX;
let snakeY;


// Funcion para generar posicion aleatoria de la comida
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`
    
    // Inserta el HTML generado en el tablero
    playBoard.innerHTML = htmlMarkup
}


changeFoodPosition();
initGame();