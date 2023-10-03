const gameElement = document.querySelector(".game");
const startButton = document.getElementById("btn-start");
// const endGameScreen = document.getElementById("end-game-screen")
const scoreElement = document.querySelector("#score span");
// const restartButton = endGameScreen.querySelector("button")
// const readyToPlay = document.getElementById("ready-to-play")

/**
 * GLOBAL VARIABLES
 */

const cellWidth = 15;
const cellHeigth = 13;
let cells = [];
let playerPosition = 28;
// let walls = 30;
let bombPosition = 0;
const forbiddenCases = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 29, 30, 44, 45, 59, 60,
  74, 75, 89, 90, 104, 105, 119, 120, 134, 135, 149, 150, 164, 165, 179, 180,
  181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 32, 34,
  36, 38, 40, 42, 62, 64, 66, 68, 70, 72, 92, 94, 96, 98, 100, 102, 122, 124,
  126, 128, 130, 132, 152, 154, 156, 158, 160, 162,
];
/**
 * JSDoc :
 * this is the score
 */

let score = 0;

startButton.addEventListener("click", startGame);

function startGame() {
  generateBoard();
  showPlayer();
  forbiddenCase();
  wall(30);
  freePlayer();
  bombe();
}

function generateBoard() {
  gameElement.innerHTML = "";
  cells = [];
  for (let i = 0; i < cellWidth * cellHeigth; i++) {
    const cell = generateCell(i);
    gameElement.append(cell);
    cells.push(cell);
  }
}

function generateCell(index) {
  const cell = document.createElement("div");
  cell.textContent = index;
  cell.classList.add("cell");
  return cell;
}
// generateBoard();

function showPlayer() {
  cells[playerPosition].classList.add("player");
}
// player();

function forbiddenCase() {
  // const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    if (forbiddenCases.includes(i)) {
      cells[i].classList.add("forbiddenCase");
    }
    // toujours faire apparaitre des murs en 26 et 58
    // cells[26].classList.add("wall");
    // cells[58].classList.add("wall");
  }
}
// convictedCase();

function move() {
  // delete player d'une case
  // ajouter le joueur sur une autre case en fonction de la touche activé
}

// const cell = document.querySelectorAll(".cell");
document.addEventListener("keydown", (event) => {
  // console.log(event.key);
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      const cellUp = cells[playerPosition - 15];
      if (
        //le joueur ne passe pas au travers les cases grisées
        !cellUp.classList.contains("forbiddenCase") &&
        //le joueur ne passe pas au travers du mur
        !cellUp.classList.contains("wall") &&
        //le joueur ne passe pas au travers de la bombe
        !cellUp.classList.contains("bomb")
      ) {
        cells[playerPosition].classList.remove("player");
        playerPosition -= 15;
        cells[playerPosition].classList.add("player");
        // console.log(playerPosition);
        // console.log("Up");
      }
      break;
    case "ArrowDown":
      const cellDown = cells[playerPosition + 15];
      if (
        !cellDown.classList.contains("forbiddenCase") &&
        !cellDown.classList.contains("wall") &&
        //le joueur ne passe pas au travers de la bombe
        !cellDown.classList.contains("bomb")
      ) {
        cells[playerPosition].classList.remove("player");
        playerPosition += 15;
        cells[playerPosition].classList.add("player");
        console.log("Down");
      }
      break;
    case "ArrowRight":
      const cellRight = cells[playerPosition + 1];
      if (
        !cellRight.classList.contains("forbiddenCase") &&
        !cellRight.classList.contains("wall") &&
        //le joueur ne passe pas au travers de la bombe
        !cellRight.classList.contains("bomb")
      ) {
        cells[playerPosition].classList.remove("player");
        playerPosition++;
        cells[playerPosition].classList.add("player");
        // console.log("Right");
      }
      break;
    case "ArrowLeft":
      const cellLeft = cells[playerPosition - 1];
      if (
        !cellLeft.classList.contains("forbiddenCase") &&
        !cellLeft.classList.contains("wall") &&
        //le joueur ne passe pas au travers de la bombe
        !cellLeft.classList.contains("bomb")
      ) {
        cells[playerPosition].classList.remove("player");
        playerPosition--;
        cells[playerPosition].classList.add("player");
        // console.log("Left");
      }
      break;
    default:
  }
});

// Faire apparaitre un certain nombre de mur aléatoire dans le jeu
function wall(num) {
  // ne pas faire apparaitre de mur sur les cases "convictedCase" ni sur le joueur

  for (let i = 0; i < num; i++) {
    const cells = document.querySelectorAll(
      ".cell:not(.player, .forbiddenCase, .wall)"
    );
    let randomCells = cells[Math.floor(Math.random() * cells.length)];

    // console.log(randomCells);
    randomCells.classList.add("wall");
  }
}
// wall(30);

function freePlayer() {
  // for (let i = 0; i < cells.length; i++) {
  // ne pas faire apparaitre de mur sur les cases 27 et 43
  cells[playerPosition - 1].classList.remove("wall");
  cells[playerPosition + 1].classList.remove("wall");
  cells[playerPosition - 15].classList.remove("wall");
  cells[playerPosition + 15].classList.remove("wall");
  // }
}
// emptyCases();

function bombe() {
  // presse "space" pour faire apparaitre la bombe

  // const cell = document.querySelectorAll(".cell");
  document.addEventListener("keydown", (event) => {
    // console.log(event.key);
    // let player = document.querySelector(".player");
    // console.log(event.key);
    const key = event.key;
    if (key === " ") {
      const currentPosition = playerPosition;
      let currentCell = cells[currentPosition];
      currentCell.classList.add("bomb");
      // timer avant que la bombe explose
      setTimeout(() => {
        // let bomb = document.querySelector(".bomb");
        currentCell.classList.remove("bomb");
        for (let i = 0; i < cells.length; i++) {
          if (
            cells[i].classList.contains("wall") &&
            cells[i].classList.contains("impactBomb")
          ) {
            cells[i].classList.remove("wall");
          }
        }
        // la bombe explose au bout de 2 secondes
      }, 2000);

      setTimeout(() => {
        // let bomb = document.querySelector(".bomb");
        // const cellList = document.querySelectorAll(".cell");

        const explArrIndices = [0, 1, 2, -1, -2, 15, 30, -15, -30];

        // const explArr = explArrIndices.map((indexOffset) => {
        //   const newIndex = Array.from(cells).indexOf(bomb) + indexOffset;
        //   return cells[newIndex];
        // });

        // console.log("explosion");
        explArrIndices.forEach((index) => {
          cells[currentPosition + index].classList.add("impactBomb");
        });
      }, 1900);

      setTimeout(() => {
        // let bomb = document.querySelector(".bomb");
        // const cellList = document.querySelectorAll(".cell");

        const explArrIndices = [0, 1, 2, -1, -2, 15, 30, -15, -30];

        // const explArr = explArrIndices.map((indexOffset) => {
        //   const newIndex = Array.from(cells).indexOf(bomb) + indexOffset;
        //   return cells[newIndex];
        // });

        // console.log("explosion");
        explArrIndices.forEach((index) => {
          cells[currentPosition + index].classList.remove("impactBomb");
        });
      }, 3000);
    }
  });
  // la bombe touche le mur
  // l'impact de la bombe devrait s'effacer
  // setTimeout(() => {
  //   const impactBombElements = document.querySelectorAll(".impactBomb");
  //   impactBombElements.forEach((element) => {
  //     element.classList.remove("impactBomb");
  //   }, 2500);
}
//   );
// }

// if (cell[i].contains(".player") && cell[i].contains("impactBomb")) {
// Game over
// }
//     }
//   }
// });
// une bombe toutes les 2 secondes (à voir)

// la bombe explose fait des dégats pendant 0,5 secondes
// elle peut toucher jusqu'a 3 cases de distance (haut, bas, droit, gauche)
// elle brise les murs qui sont à distance
// elle tue le personnage s'il rentre dans la zone de dégat lors de l'explosion
// }
//   );
// }
// bombe();

function points() {
  // gagne des points lorsqu'un mur se brise
}

function timer() {
  // faire des parties de 30 secondes (à voir)
  // la partie se termine à la fin du chrono
}
