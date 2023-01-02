const modalTicTacToe = document.getElementById('modal-tictactoe')

// Get the button that opens the modal
const btnTicTacToe = document.getElementById('tictactoe-application')
console.log(btnTicTacToe)

// Get the <span> element that closes the modal
const spanTicTacToe = document.getElementById('close-tictactoe')
console.log(spanTicTacToe)

// When the user clicks the button, open the modal
btnTicTacToe.onclick = function () {
  modalTicTacToe.style.display = 'block'
  console.log('Get the modal')
}

// When the user clicks on <span> (x), close the modal
spanTicTacToe.onclick = function () {
  modalTicTacToe.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function (event) {
  if (event.target === modalTicTacToe) {
    modalTicTacToe.style.display = 'none'
  }
}

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

let fileHandle = null

let counterForDraw = 1
let isBtnImportDataFromJsonClicked = false

const btnStartGame = document.getElementById('startGame')
const btnImportGame = document.getElementById('importGame')
const btnExportGame = document.getElementById('exportGame')
const msgError = document.getElementById('error')
const btnNextGame = document.getElementById('nextGame')
const btnResetGame = document.getElementById('resetGame')
const blockImportGame = document.getElementById('blockImportGame')
const btnBlock = document.getElementById('btnBlock')

/* -----------------------------------------------------------------------------
* btnStartGame : This will start the game
* -----------------------------------------------------------------------------
*/

btnStartGame.addEventListener('click', function (event) {
  // eslint-disable-next-line no-undef
  singleVibration(100)
  event.preventDefault()
  player1 = document.getElementById('namePlayer1').value
  player2 = document.getElementById('namePlayer2').value

  if ('' !== player1 && '' !== player2) {
    if (player1 !== player2) {
      resetBoard()
      turn = player1
      updateGameInformations({ winner: '', turn })
      hideForm()
      showGame()
      initializeCellAndPlay()
      blockImportGame.style = 'display:none;'
      btnBlock.style = 'display:block;'
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

      if ('X' === winner) {
        winner = player1
      } else if ('O' === winner) {
        winner = player2
      }
      btnNextGame.style.display = 'block'
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
    if ('clicked' === allPlace[i].className) {
      counterForDraw++
      break
    }
  }
  if (10 === counterForDraw && '' === winner) {
    winner = 'none'
    turn = null
    updateGameInformations({ winner, turn })
  }
}

/* -----------------------------------------------------------------------------
* initializeCellAndPlay : Initalize game board, play, and check if there is a winner
* -----------------------------------------------------------------------------
*/

function initializeCellAndPlay () {
  document.getElementById('checkbox-vibration-toggle').style.backgroundColor = 'red'
  btnResetGame.addEventListener('click', resetBoard)
  btnNextGame.addEventListener('click', nextGame)

  const cells = document.getElementsByTagName('td')

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (event) {
      if ('' === winner && 'notClicked' === cells[i].className) {
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
  if ('notClicked' === playedCell.className && '' === winner) {
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
* updateGameInformations : Update game information like turn, score and display state of game
* -----------------------------------------------------------------------------
*/
function updateGameInformations ({ winner, turn }) {
  const h2 = document.getElementById('turn')

  const player1Score = document.getElementById('playerX1')
  const player2Score = document.getElementById('playerO2')

  if ('' === winner) {
    h2.innerText = 'It\'s your turn ' + turn
  } else {
    if (winner === player1) {
      h2.innerText = 'Winner is ' + player1 + ' !'
      score.p1++
      btnResetGame.style.display = 'none'
    } else if (winner === player2) {
      h2.innerText = 'Winner is ' + player2 + ' !'
      score.p2++
      btnResetGame.style.display = 'none'
    } else if ('none' === winner) {
      h2.innerText = 'It\'s a tie'
    }
    if (isBtnImportDataFromJsonClicked) {
      updateJsonData(score.p1, score.p2)
    }
  }
  player1Score.innerText = 'Score of ' + player1 + ' : ' + score.p1
  player2Score.innerText = 'Score of ' + player2 + ' : ' + score.p2
}

/* -----------------------------------------------------------------------------
* UpdateJsonData : update data in json file
* -----------------------------------------------------------------------------
*/

async function updateJsonData (scorePlayer1, scorePlayer2) {
  const updateData = JSON.stringify({
    player1,
    score_player1: scorePlayer1,
    player2,
    score_player2: scorePlayer2
  })

  const stream = await fileHandle.createWritable()
  // write our file
  await stream.write(updateData)
  await stream.close()
}

/* -----------------------------------------------------------------------------
* ExportGame : reset the board, hide some button and start new game
* -----------------------------------------------------------------------------
*/

btnExportGame.addEventListener('click', function (event) {
  const updateData = JSON.stringify({
    player1,
    score_player1: score.p1,
    player2,
    score_player2: score.p2
  })
  // create blob object of json data with mime type application json
  const blob = new Blob([updateData], { type: 'application/json' })

  // create url and a element to dl the file on btn click
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = player1 + '_vs_' + player2 + '_savedGame.json'
  document.body.appendChild(a)
  a.click()

  // free space of navigator
  URL.revokeObjectURL(url)
})

/* -----------------------------------------------------------------------------
* nextGame : reset the board, hide some button and start new game
* -----------------------------------------------------------------------------
*/
function nextGame () {
  btnNextGame.style.display = 'none'
  btnResetGame.style.display = 'block'
  resetBoard()
}

/* -----------------------------------------------------------------------------
* hideForm : Hide names form
* -----------------------------------------------------------------------------
*/

function hideForm () {
  const playerForm = document.getElementById('playerForm')
  playerForm.style.display = 'none'
}

/* -----------------------------------------------------------------------------
* showGame : show game and score board
* -----------------------------------------------------------------------------
*/

function showGame () {
  const gameBoard = document.getElementById('gameBoard')
  const infoBlock = document.getElementById('infoBlock')
  gameBoard.style.display = 'block'
  infoBlock.style.display = 'block'
}

/* -----------------------------------------------------------------------------
* importGame : Import stored game from jsonFile
* ------------------------------------------------------------------------------
*/

btnImportGame.addEventListener('click', function (event) {
  event.preventDefault()
  console.log('clicked')
  this.style.display = 'none'
  OpenJsonFile()
})

async function OpenJsonFile () {
  [fileHandle] = await window.showOpenFilePicker()
  const fileData = await fileHandle.getFile()
  const fileText = await fileData.text()
  const dataInJson = JSON.parse(fileText)

  document.getElementById('namePlayer1').value = dataInJson.player1
  document.getElementById('namePlayer2').value = dataInJson.player2
  score.p1 = dataInJson.score_player1
  score.p2 = dataInJson.score_player2
  isBtnImportDataFromJsonClicked = true

  btnStartGame.click()
}
