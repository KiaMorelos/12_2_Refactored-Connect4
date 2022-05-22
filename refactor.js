class Game {
    constructor(playerOne, playerTwo, width = 7, height = 6){
        this.players = [playerOne, playerTwo]
        this.width = width;
        this.height = height;
        this.currPlayer = playerOne;
        this.makeBoard();
        this.makeHtmlBoard();
    }

    makeBoard() {
        // TODO: set "board" to empty HEIGHT x WIDTH matrix array
        this.board = [];
        for(let gameSquare = 0; gameSquare < this.height; gameSquare++){
          this.board.push(Array.from({ length: this.width}))
        }
      }
   
    makeHtmlBoard() {
        //get "htmlBoard" variable from the item in HTML w/ID of "board"
        const htmlBoard = document.getElementById("board")
        htmlBoard.innerHTML = ''
        // create upper most table row, set id to colum-top, add a click event listener
        const top = document.createElement("tr");
        top.setAttribute("id", "column-top");
        top.addEventListener("click", this.handleClick.bind(this));
      
        for (let col = 0; col < this.width; col++) {
          const headCell = document.createElement("td");
          headCell.setAttribute("id", col);
          top.append(headCell);
        }
        
        htmlBoard.append(top);
      
        // create a new tr element until  row count is equal to height / (number of rows)
        //create assign an id that matches the current index, and then append td cells to the rows until the number of cells is equal to width / (number of columns)
        //append the tr elemnts to game board
        for (let row = 0; row < this.height; row++) {
          const tableRow = document.createElement("tr");
          for (let col = 0; col < this.width; col++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${row}-${col}`);
            tableRow.append(cell);
          }
          htmlBoard.append(tableRow);
        }
    }

    findSpotForPiece(col) {
        // TODO: write the real version of this, rather than always returning 0, undefined is a falsy value, so we have to add the ! to make it truthy, and allow pieces to be placed, and the opposite for truthy (filled)
        for(let row = this.height - 1; row >=0; row--){
          if(!this.board[row][col]){
            return row; //lowest empty row slot
          }
        }
        return null
      }

      placeInTable(row, col) {
        // TODO: make a div and insert into correct table cell
        const piece = document.createElement("div");
      
        piece.classList.add("piece");
        piece.style.backgroundColor = this.currPlayer.color
      
        const slot = document.getElementById(`${row}-${col}`)
        slot.append(piece)
      }

      endGame(msg) {
        // TODO: pop up alert message
        alert(msg)
      }
      
      handleClick(evt) {
        // get x from ID of clicked cell
        const col = +evt.target.id;
        const playerTurn = document.querySelector("h1")
        // get next spot in column (if none, ignore click)
        const row = this.findSpotForPiece(col);
        if (row === null) {
          return;
        }
      
        // place piece in board and add to HTML table
        // TODO: add line to update in-memory board
        this.board[row][col] = this.currPlayer;
        this.placeInTable(row, col);
      
        // check for win
        if (this.checkForWin()) {
          playerTurn.innerText = `Player ${this.currPlayer.color} won the game!`
          const gameBoard = document.getElementById("board")
          gameBoard.classList.add("noClicking") // don't allow more pieces to drop after game has been won.
          return this.endGame(`Player ${this.currPlayer.color} won the game!`);  
        }
      
        // // check for tie
        // // TODO: check if all cells in board are filled; if so call, call endGame
      
        // check for tie
         if (this.board.every(row => row.every(square => square))) {
        return this.endGame("It's a tie!");
        }
      
        // switch players
        // TODO: switch currPlayer 1 <-> 2
        this.currPlayer === this.players[0] ? this.currPlayer = this.players[1] : this.currPlayer = this.players[0];

        if(this.currPlayer === this.players[1]) {
          playerTurn.style.color = this.players[1].color
        } else {
          playerTurn.style.color = this.players[0].color
        }

        playerTurn.innerText = `It's player ${this.currPlayer.color}'s turn`
        
      }
      
      checkForWin() {
        const _win = cells =>
         // Check four cells to see if they're all color of current player
         //  - cells: list of four (row, col) cells
         //  - returns true if all are legal coordinates & all match currPlayer
     
         cells.every(
           ([row, col]) =>
             row >= 0 &&
             row < this.height &&
             col >= 0 &&
             col < this.width &&
             this.board[row][col] === this.currPlayer
         );
       
     
       
     
       // TODO: read and understand this code. Add comments to help you.
     
       for (let row = 0; row < this.height; row++) { //iterate through board arrays rows, then iterate through each element in the rows, the [row, col] index will correspond to where the loop is at with cols, and rows, with digits added to cover the correct positions on the JS board
         for (let col = 0; col < this.width; col++) {
           const horiz = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]]; //find what values are in horizontal row of four
           const vert = [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]]; //find what values are in vertical row of four
           const diagDR = [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]]; //find what values are in diagonal right row of four
           const diagDL = [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]]; //find what values are in diagonal left row of four
     
           if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //pass all of these combinatoins to the checkForWin function
             return true;
           }
         }
       }
    }
   
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

class ComputerPlayer {
  constructor(color){
  this.color = color;
  }
   pickRrandomCol() {
    const randomNum = Math.floor(Math.random() * 7 + 1)
 } 
}

const startButton = document.getElementById("startNew");
startButton.addEventListener("click", function(evt){
 let playerOne = new Player(document.getElementById("playerOne").value) 
 let playerTwo = new ComputerPlayer(document.getElementById("playerTwo").value) 
 new Game(playerOne, playerTwo)
 let board = document.getElementById("board")
 if(board.classList.value === "noClicking"){
   board.classList.remove("noClicking")
 } 

 if(board.classList.value === "hidden"){
  board.classList.remove("hidden")
} 
});