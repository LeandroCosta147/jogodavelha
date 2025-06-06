const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]");
const winningMessagetextElements = document.querySelector("[data-winning-message-text]");
const winningMessege = document.querySelector("[data-winning-message]");
const restarButton = document.querySelector("[data-restart-button]");

let isCircleTurn ;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const starGame = () => {
 isCircleTurn = false;

    for (const cell of cellElements) {

    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleclick);
    cell.addEventListener('click', handleclick, {once : true});
    
}


 steBoardHoverClass()
winningMessege.classList.remove("show-winning-message");
}; 


const endgame = (isdraw) => {
    if (isdraw) {
        winningMessagetextElements.innerText = "Empate!";
    } else {
        winningMessagetextElements.innerText = isCircleTurn 
        ? "O Venceu" 
        : "X venceu";
    }

    winningMessege.classList.add("show-winning-message")

};


const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkFordraw = () => {
    return [...cellElements].every(cell =>{
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });

}

const placeMark = (cell, classToadd) => {
    cell.classList.add(classToadd);
};


const steBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");

    } else {
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    steBoardHoverClass();



    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");

    } else {
        board.classList.add("x");
    }
};




const handleclick = (e) => {
// Colocar a Marca (x ou Circulo)
const cell = e.target;
const classToadd = isCircleTurn ? 'circle' : 'x';

placeMark(cell, classToadd );


cell.classList.add(classToadd);
//verificar por vitoria
const isWin = checkForWin(classToadd);

//verificar por Empate
const isdraw = checkFordraw();
if (isWin) {
    endgame(false);
} else if (isdraw) {
    endgame(true);
} else {
    
    //Mudar Símbolo
    swapTurns(); 
}





};

for (const cell of cellElements) {
    cell.addEventListener('click', handleclick, {once : true});
}

starGame();

restarButton.addEventListener("click", starGame);