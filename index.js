const X = 'x';
const circle = 'circle';
const WiningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]");
const boardId = document.getElementById("board");
const showMessage = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restart = document.getElementById("restartButton");
let turn = false;

startGame();
restart.addEventListener("click", startGame);

function startGame(){
 // turn  = false; //always start with X
  cellElements.forEach(cell=>{
    cell.classList.remove(X);
    cell.classList.remove(circle);
    cell.removeEventListener("click", handleClick); //problem in understanding the logic
    cell.addEventListener("click", handleClick, {once:true});
});
setBoardHoverEffect();
showMessage.classList.remove("show");
}

function handleClick(event){
  const cell = event.target;
  const currentTurn = turn ? circle : X ;
  
  placeMark(cell, currentTurn);

  if(checkWin(currentTurn)){
     endGame(false);
  } else if (isDraw()){
    endGame(true);
  } else{
    swapTurn();
    setBoardHoverEffect();
  }
}   

function endGame(draw){
  if(draw){
    winningMessageTextElement.innerText = "Draw!";
  } else{
    winningMessageTextElement.innerText = `${turn ? "O's" : "X's"} Wins!`;
  }
  showMessage.classList.add("show");   
}

function isDraw(){
  return [...cellElements].every(cell => {
    return cell.classList.contains(X) || cell.classList.contains(circle)
  });
}

function placeMark(cell, currentTurn){
    cell.classList.add(currentTurn);
}

function swapTurn(){
  turn = !turn;
}

function setBoardHoverEffect(){
  boardId.classList.remove(X);
  boardId.classList.remove(circle);
  if(turn){
    boardId.classList.add(circle);
  } else{
    boardId.classList.add(X);
  }
}

function checkWin(currentTurn){
   return WiningCombination.some(combination => {
     return  combination.every(index => {
       return cellElements[index].classList.contains(currentTurn); 
     })
   })
}