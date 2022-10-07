// A faire : Systeme de point 
// A faire : Faire cas quand égalité
// A faire : Changer icone tictactoe
// A faire : meilleur design

// variables globale
let player1 = "";
let player2 = "";
let turn = "";
let winner = "";

// on récupère les informations utiles

let game_player_form = document.getElementById("tictactoe_section_form");
let game_section = document.getElementById("game");
let plateau = document.getElementById("plateau");
let scoreBoard = document.getElementById("scoreBoard");
let btnStartGame = document.getElementById("startGame");
let msgError = document.getElementById("error");
let closeGame = document.getElementById("closeGame");
let btnNextGame = document.getElementById("nextGame");
let formulaire = document.getElementById("tictactoe_section_form");


/*-----------------------------------------------------------------------------
 * btnStartGame : Commence la partie quand l'utilisateur clique sur démarrer
 * -----------------------------------------------------------------------------
 */
btnStartGame.addEventListener('click', function (event) {


    event.preventDefault();
    player1 = document.getElementById("namePlayer1").value;
    player2 = document.getElementById("namePlayer2").value;

    console.log(player1);
    console.log(player2);

    if (player1 != "" && player2 != "") {

        if (player1 != player2) {

            resetBoard();

            turn = player1;
            updateGameInformations({ winner: "", turn: turn });

            hideForm();
            showPlateau();

            console.log("début de la partie !");
            initializeCellAndPlay();

        }
        else {
            msgError.innerText = "Veuillez indiquer deux nom différents"
            msgError.style.color = "rgb(165, 51, 51)";
        }

    }
    else {
        msgError.innerText = "Veuillez remplir les champs"
        msgError.style.color = "rgb(165, 51, 51)";
    }



});


/*-----------------------------------------------------------------------------
 * closeGame : Ferme l'onglet de jeu
 * -----------------------------------------------------------------------------
 */
closeGame.addEventListener("click", function () {

    window.close();

});

function initializeCellAndPlay() {

    const reset = document.getElementById("resetGame");
    reset.addEventListener("click", resetBoard);

    const changeOpp = document.getElementById("changeOpponent");
    changeOpp.addEventListener("click", changeOpponent);

    btnNextGame.addEventListener("click", nextGame);

    let cells = document.getElementsByTagName("td");
    console.log("initialisation ...");


    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function (event) {
            console.log("event !");
            if (winner === "" && cells[i].innerText === "") {

                if (turn === player1) {
                    if (cells[i].innerText === "X" || cells[i].innerText === "O") {

                    } else {
                        cells[i].className = "X";
                        cells[i].innerText = "X"
                        turn = player2;
                    }

                }
                else {
                    if (cells[i].innerText === "X" || cells[i].innerText === "O") {

                    } else {
                        cells[i].className = "O";
                        cells[i].innerText = "O"
                        turn = player1;


                    }


                }

            }
            checkWinner(cells)
        });
    }
}


/*-----------------------------------------------------------------------------
 * checkWinner : Vérifie si on a un vainqueur
 * Identifiants des cellules :
 *     <table> |---|---|---|
 *             | 0 | 1 | 2 |
 *             |---|---|---|
 *             | 3 | 4 | 5 |
 *             |---|---|---|
 *             | 6 | 7 | 8 |
 *             |---|---|---| </table>
 */
const checkWinner = (carre) => {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {

        // on met dans la variable "a" toutes les données en colonne 1
        // soit 0,3,6,0,1,2,0,2
        // on met dans la variable "b" toutes les données en colonne 2
        // on met dans la variable "c" toutes les données en colonne 3

        const [a, b, c] = lines[i];

        if (carre[a].innerText &&
            carre[a].innerText === carre[b].innerText &&
            carre[b].innerText === carre[c].innerText) {

            winner = carre[a].innerText;

            if (winner === "X") {
                winner = player1;
            }
            else if (winner === "O") {
                winner = player2;
            }
            btnNextGame.style.visibility = "visible";
        }
    }
    updateGameInformations({ winner, turn })

}

// Fonction qui permet de cacher ou d'afficher le formulaire et le plateau de jeu
function hideForm() {
    formulaire.style.visibility = "hidden";
}
function showForm() {
    formulaire.style.visibility = "visible";
}
function hidePlateau() {
    plateau.style.visibility = "hidden";
}
function showPlateau() {
    plateau.style.visibility = "visible";
}


/*-----------------------------------------------------------------------------
 * Supprime toutes les classes et tout le contenu des toutes les cellules du
 * plateau de jeu HTML.
 * -----------------------------------------------------------------------------
 */
function resetBoard() {

    turn = player1;
    winner = "";
    console.log("DANS RESET : name " + turn);
    updateGameInformations({ winner: winner, turn: turn });

    let cells = document.getElementsByTagName("td");
    let msgError = document.getElementById("error");

    for (let i = 0; i < cells.length; i++) {
        cells[i].className = "";
        cells[i].innerText = "";

    }

    msgError.innerText = "";
}


/*-----------------------------------------------------------------------------
 * changeOpponent : Change d'adversaire en pleine partie ou à la fin
 * -----------------------------------------------------------------------------
 */
function changeOpponent() {

    hidePlateau();
    btnNextGame.style.visibility = "hidden";
    showForm();

}

/*-----------------------------------------------------------------------------
 * nextGame : Met à jour les scores des joueurs, reset le plateau de jeu et commence la nouvelle manche
 * -----------------------------------------------------------------------------
 */
function nextGame() {

    btnNextGame.style.visibility = "hidden";
    resetBoard();

    // @todo Systeme de point 

}

/*-----------------------------------------------------------------------------
 * updateGameInformations : Met à jour le text indiquant à qui est le tour et 
 * affiche le vainqueur si on est en fin de game
 * -----------------------------------------------------------------------------
 */
function updateGameInformations({ winner, turn }) {


    let h2 = document.getElementsByTagName('h2')[0];

    if (winner === "") {

        h2.innerText = "À vous de jouer " + turn;

    }
    else {

        if (winner === player1) {
            h2.innerText = "Bravo " + player1 + " vous avez gagné !";
        }
        else if (winner === player2) {
            h2.innerText = "Bravo " + player2 + " vous avez gagné !";
        }
        else if (winner === "none") {
            h2.innerText = "Match nul !!!";
        }
        else {
            h2.innerText = "Aucune partie en cours";
        }
    }
}