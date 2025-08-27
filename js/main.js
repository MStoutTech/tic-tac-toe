class Player{
    constructor(name, symbol){
        this.name = name;
        this.symbol = symbol;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
    }
}



//game class
class Game {
    constructor(){
        //New game sets up players
        this.playerX = new Player("Player X", "X");
        this.playerY = new Player("Player Y", "Y");
        //track player turn
        this.playerTurn = this.playerX;
        //track board symbols
        this.board = Array(9).fill(null);
        //track game state
        this.gameOver = false;
    }
    init (){
        //Add event listeners
        const cells = document.querySelectorAll(".cell")
        const resetButton = document.querySelector(".restart")

        //Event listeners for cells
        cells.forEach(cell => {
            cell.addEventListener("click", () => this.cellClick())
        })
        //Event listner for reset button
        resetButton.addEventListener('click', () => this.resetGame());
    }
  //switch player
    switchPlayer() {
        if (this.playerTurn ===this.playerX){
            this.playerTurn = this.playerY
        } else {
            this.playerTurn = this.playerX;
        }
    }

    cellClick(){
      
      if (this.gameOver){
        return;
      }
      
      //return the cell that is being targeted
      const cell = event.target;
      //find the index of the cell
      const index = cell.dataset.index
      
      //if the board has a symbpol already, don't do anything else
      if (this.board[index] !== null){
        return;
      }
      //
      this.board[index] = this.playerTurn.symbol;
      cell.textContent = this.playerTurn.symbol;
      
     if (this.checkWin()){
        return;
      }
      if (this.checkDraw()){
      return;
      }
      this.switchPlayer();
    }
  //check for win
    checkWin() {
        //Winning array index patterns
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6] // diagonals
        ];

        //Iterate through patterns for current player
        if (winPatterns.some(pattern => pattern.every(index => this.board[index]=== this.playerTurn.symbol))){
            document.querySelector('.status').textContent= `${this.playerTurn.name} wins!`
            this.gameOver = true;
            this.playerTurn.wins += 1;
            if (this.playerTurn === this.playerX){
                this.playerY.losses += 1;
            } else{
                this.playerX.losses += 1;
            }
            return true;
        }
        else return false;
    }
  //check for draw
    checkDraw(){
        if (this.board.findIndex(cell => cell === null) < 0){
            document.querySelector('.status').textContent= "Game is a Draw!"
            this.gameOver = true;
            this.playerTurn.draws += 1;
            return true;
        }
        else return false;
    }
  //reset game
    resetGame(){
        this.board = Array(9).fill(null);
        document.querySelectorAll('.cell').forEach(cell => cell.textContent ='')
        this.playerTurn = this.playerX;
        this.gameOver = false;
        document.querySelector('.status').textContent= ``
    }
}

const gameStart = new Game();

//Make sure DOM is loaded before trying to add event listeners in the init method

document.addEventListener('DOMContentLoaded', () => {
    gameStart.init();
});