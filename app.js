/*
BINGO CHALLENGE!!!
Create programmatically (with JS) a BINGO board with 76 cells, from 1 to 76.
Create a button to randomize a number from 1 to 76. The same number should be highlighted on the bingo board

EXTRA: 
- Take ALWAYS a new number (eg. avoid randoming the number 10 3 times)
- Create a USER BOARD with 24 randomized numbers that highlights as the main board does
- Let the user choose HOW MANY user boards he's willing to play with and create them.
*/
const drawnNumbersGame = []
const drawnNumbersUser = []
const userCards = []
const bingoNumbers = 75
const userNumbers = 24

const cardsNumberInput = document.getElementById("cards-number")
const letsPlayBtn = document.getElementById("lets-play")

const prepareGameSection = document.querySelector(".prepare-game")
const drawNumberSection = document.querySelector(".draw-number")

const drawNumberBtn = document.getElementById("draw-number-btn")
const drawnNumber = document.getElementById("drawn-number")

const gameBoardSection = document.querySelector(".game-board")

const userCardsSection = document.querySelector(".user-cards")

// BUILD GAME BOARD
const buildGameBoard = () => {
  for (let i = 0; i < bingoNumbers; i++) {
    const gameCell = document.createElement("div")
    gameCell.classList.add("game-cell")
    gameCell.innerText = i + 1
    gameBoardSection.appendChild(gameCell)
  }
}
buildGameBoard()

// PREPARE GAME
const prepareGame = () => {
  const numberOfCards = cardsNumberInput.value
  prepareGameSection.classList.add("hide-section")
  drawNumberSection.classList.remove("hide-section")
  buildUserCards(numberOfCards)
}
letsPlayBtn.addEventListener("click", prepareGame)

// BUILD USER CARDS
const buildUserCards = (numberOfCards) => {
  for (let j = 0; j < numberOfCards; j++) {
    // New card array
    const userCells = []
    // New card div
    const newCardDiv = document.createElement("div")
    newCardDiv.classList.add("user-card")
    for (let i = 0; i < userNumbers; i++) {
      let randomNumber
      do {
        randomNumber = Math.floor(Math.random() * bingoNumbers) + 1
      } while (userCells.includes(randomNumber))
      userCells.push(randomNumber)

      // New card cell
      const newUserCell = document.createElement("div")
      newUserCell.classList.add("user-cell")
      newUserCell.innerText = randomNumber

      newCardDiv.appendChild(newUserCell)
    }
    console.log(userCells)
    userCards.push(userCells)
    userCardsSection.appendChild(newCardDiv)
  }
  console.log(userCards)
}

const drawNumber = () => {
  markGameBoard()
}
drawNumberBtn.addEventListener("click", drawNumber)

const markGameBoard = () => {
  let randomNumber
  do {
    randomNumber = Math.floor(Math.random() * bingoNumbers) + 1
  } while (drawnNumbersGame.includes(randomNumber))

  drawnNumbersGame.push(randomNumber)
  drawnNumber.innerText = randomNumber
  const cells = document.querySelectorAll(".game-cell")
  cells[randomNumber - 1].classList.add("drawn")
}

const markUserBoard = () => {}
