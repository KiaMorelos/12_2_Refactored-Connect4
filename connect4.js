/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//NOTES - I have updated the variables in this code that formerly were y and x, to row and col for readability (having them named more descriptively helped me understand the code better)

const WIDTH = 7;
const HEIGHT = 6; 

let currPlayer = 1; // active player: 1 or 2
let playerTurn = document.querySelector("h1")

const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[row][col])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let gameSquare = 0; gameSquare < HEIGHT; gameSquare++){
    board.push(Array.from({ length: WIDTH}))
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")
  // create upper most table row, set id to colum-top, add a click event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let col = 0; col < WIDTH; col++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", col);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create a new tr element until  row count is equal to height / (number of rows)
  //create assign an id that matches the current index, and then append td cells to the rows until the number of cells is equal to width / (number of columns)
  //append the tr elemnts to game board
  for (let row = 0; row < HEIGHT; row++) {
    const tableRow = document.createElement("tr");
    for (let col = 0; col < WIDTH; col++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${row}-${col}`);
      tableRow.append(cell);
    }
    htmlBoard.append(tableRow);
  }
}

/** findSpotForCol: given column x, return top empty row y (null if filled) */

function findSpotForPiece(col) {
  // TODO: write the real version of this, rather than always returning 0, undefined is a falsy value, so we have to add the ! to make it truthy, and allow pieces to be placed, and the opposite for truthy (filled)
  for(let row = HEIGHT - 1; row >=0; row--){
    if(!board[row][col]){
      return row; //lowest empty row slot
    }
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(row, col) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");

  piece.classList.add("piece");
  piece.classList.add(`player${currPlayer}`);

  const slot = document.getElementById(`${row}-${col}`)
  slot.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let col = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let row = findSpotForPiece(col);
  if (row === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[row][col] = currPlayer;
  placeInTable(row, col);

  // check for win
  if (checkForWin()) {
    playerTurn.innerText = `Player ${currPlayer} won the game!`
    const gameBoard = document.getElementById("board")
    gameBoard.classList.add("noClicking") // don't allow more pieces to drop after game has been won.
    startOver()
    return endGame(`Player ${currPlayer} won the game!`);    
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  function checkForTie(board) {
    return board.every(function(nested){
      return nested.every(function(isFilled){ 
        return isFilled
      })
    })
    
  }

  if(checkForTie(board)){
    endGame("It's a tie!!")
    startOver()
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
  
  if(currPlayer === 2) {
    playerTurn.classList.add("two")
    playerTurn.classList.remove("one")

  } else {
    playerTurn.classList.add("one")
    playerTurn.classList.remove("two")

  }
  playerTurn.innerText = `It's Player ${currPlayer}'s turn`
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (row, col) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([row, col]) =>
        row >= 0 &&
        row < HEIGHT &&
        col >= 0 &&
        col < WIDTH &&
        board[row][col] === currPlayer
    );
  }

  

  // TODO: read and understand this code. Add comments to help you.

  for (let row = 0; row < HEIGHT; row++) { //iterate through board arrays rows, then iterate through each element in the rows, the [row, col] index will correspond to where the loop is at with cols, and rows, with digits added to cover the correct positions on the JS board
    for (let col = 0; col < WIDTH; col++) {
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

function startOver(){
  const restart = document.createElement("button");
  restart.innerText = "Start the Game Again";
  const body = document.querySelector("body");
  body.prepend(restart);
  restart.addEventListener("click", function(evt){
    document.location.reload(true);
    body.remove(restart);
  });
}

makeBoard();
makeHtmlBoard();
