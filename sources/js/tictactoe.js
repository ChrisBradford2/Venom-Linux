/* -----------------------------------------------------------------------------
* Global Variables
* -----------------------------------------------------------------------------
*/

let player1 = ''
let player2 = ''
let turn = ''
let winner = ''
const score = {
  p1: 0, p2: 0
}
let counterForDraw = 1

const btnStartGame = document.getElementById('startGame')
const msgError = document.getElementById('error')
const closeGame = document.getElementById('closeGame')
const btnNextGame = document.getElementById('nextGame')
const btnResetGame = document.getElementById('resetGame')

/* -----------------------------------------------------------------------------
* btnStartGame : This will start the game
* -----------------------------------------------------------------------------
*/

btnStartGame.addEventListener('click', function (event) {
  event.preventDefault()
  player1 = document.getElementById('namePlayer1').value
  player2 = document.getElementById('namePlayer2').value

  if (player1 !== '' && player2 !== '') {
    if (player1 !== player2) {
      resetBoard()
      turn = player1
      updateGameInformations({ winner: '', turn })
      hideForm()
      showGame()
      initializeCellAndPlay()
    } else {
      msgError.innerText = 'Names must be different'
      msgError.style.color = 'rgb(165, 51, 51)'
    }
  } else {
    msgError.innerText = 'Please enter a name for each player'
    msgError.style.color = 'rgb(165, 51, 51)'
  }
})

/* -----------------------------------------------------------------------------
* ResetBoard : reset all classes and content for cells, replace turn for player1
* -----------------------------------------------------------------------------
*/

function resetBoard () {
  turn = player1
  winner = ''
  updateGameInformations({ winner, turn })

  const cells = document.getElementsByTagName('td')
  const msgError = document.getElementById('error')

  for (let i = 0; i < cells.length; i++) {
    cells[i].className = 'notClicked'
    cells[i].innerText = ''
  }
  counterForDraw = 1
  msgError.innerText = ''
}

/* -----------------------------------------------------------------------------
* closeGame : Close the game and go back to previous screen (main screen)
* -----------------------------------------------------------------------------
*/

closeGame.addEventListener('click', function () {
  window.close()
})

/* -----------------------------------------------------------------------------
* initializeCellAndPlay : Initalize game board, play, and check if there is a winner
* -----------------------------------------------------------------------------
*/

function initializeCellAndPlay () {
  btnResetGame.addEventListener('click', resetBoard)
  btnNextGame.addEventListener('click', nextGame)

  const cells = document.getElementsByTagName('td')

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (event) {
      if (winner === '' && cells[i].className === 'notClicked') {
        play(cells[i])
        checkWin(cells)
        checkDraw(cells)
      }
    })
  }
}

/* -----------------------------------------------------------------------------
* play : put symbol in played cell, and change classname
* -----------------------------------------------------------------------------
*/

function play (playedCell) {
  if (playedCell.className === 'notClicked' && winner === '') {
    if (turn === player1) {
      playedCell.className = 'clicked'
      playedCell.innerText = 'X'
      turn = player2
    } else {
      playedCell.className = 'clicked'
      playedCell.innerText = 'O'
      turn = player1
    }
  }
}

/* -----------------------------------------------------------------------------
* checkWin : Check if we are a winner
*     <table> |---|---|---|
*             | 0 | 1 | 2 |
*             |---|---|---|
*             | 3 | 4 | 5 |
*             |---|---|---|
*             | 6 | 7 | 8 |
*             |---|---|---| </table>
* -----------------------------------------------------------------------------
*/
const checkWin = (allCells) => {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winnerLines.length; i++) {
    // decomposition of array
    // "a" contain all data from first col (0,3,6,0,1,2,0,2)
    // "b" contain all data from second col
    // "c" contain all data from third col

    const [a, b, c] = winnerLines[i]

    if (allCells[a].innerText && allCells[a].innerText === allCells[b].innerText && allCells[b].innerText === allCells[c].innerText) {
      winner = allCells[a].innerText

      if (winner === 'X') {
        winner = player1
      } else if (winner === 'O') {
        winner = player2
      }
      btnNextGame.style.visibility = 'visible'
    }
  }
  updateGameInformations({ winner, turn })
}

/* -----------------------------------------------------------------------------
* checkDraw : Check if there is a tie
* -----------------------------------------------------------------------------
*/

function checkDraw (allPlace) {
  for (let i = 0; i < allPlace.length; i++) {
    if (allPlace[i].className === 'clicked') {
      counterForDraw++
      break
    }
  }
  if (counterForDraw === 10 && winner === '') {
    winner = 'none'
    turn = null
    updateGameInformations({ winner, turn })
  }
}
/* -----------------------------------------------------------------------------
* updateGameInformations : Update game information like turn, score and display state of game
* -----------------------------------------------------------------------------
*/
function updateGameInformations ({ winner, turn }) {
  const h2 = document.getElementsByTagName('h2')[0]

  const player1Score = document.getElementById('playerX1')
  const player2Score = document.getElementById('playerO2')

  if (winner === '') {
    h2.innerText = 'It\'s your turn ' + turn
  } else {
    if (winner === player1) {
      h2.innerText = 'Winner is ' + player1 + ' !'
      score.p1++
      btnResetGame.style.visibility = 'hidden'
    } else if (winner === player2) {
      h2.innerText = 'Winner is ' + player2 + ' !'
      score.p2++
      btnResetGame.style.visibility = 'hidden'
    } else if (winner === 'none') {
      h2.innerText = 'It\'s a tie'
    }
  }
  player1Score.innerText = 'Score of ' + player1 + ' : ' + score.p1
  player2Score.innerText = 'Score of ' + player2 + ' : ' + score.p2
}

/* -----------------------------------------------------------------------------
* nextGame : reset the board, hide some button and start new game
* -----------------------------------------------------------------------------
*/
function nextGame () {
  btnNextGame.style.visibility = 'hidden'
  btnResetGame.style.visibility = 'visible'
  resetBoard()
}

/* -----------------------------------------------------------------------------
* hideForm : Hide names form
* -----------------------------------------------------------------------------
*/

function hideForm () {
  const playerForm = document.getElementById('playerForm')
  playerForm.style.visibility = 'hidden'
}

/* -----------------------------------------------------------------------------
* showGame : show game and score board
* -----------------------------------------------------------------------------
*/

function showGame () {
  const gameBoard = document.getElementById('gameBoard')
  const infoBlock = document.getElementById('infoBlock')
  gameBoard.style.visibility = 'visible'
  infoBlock.style.visibility = 'visible'
}
