/*
BINGO CHALLENGE!!!
Create programmatically (with JS) a BINGO board with 76 cells, from 1 to 76.
Create a button to randomize a number from 1 to 76. The same number should be highlighted on the bingo board

EXTRA: 
- Take ALWAYS a new number (eg. avoid randoming the number 10 3 times)
- Create a USER BOARD with 24 randomized numbers that highlights as the main board does
- Let the user choose HOW MANY user boards he's willing to play with and create them.
*/
let drawnNumbers = []
let userCards = []
const bingoNumbers = 75
const numberOfCardCells = 24

const cardsNumberInput = document.getElementById("cards-number")
const letsPlayBtn = document.getElementById("lets-play")

const prepareGameSection = document.querySelector(".prepare-game")
const drawNumberSection = document.querySelector(".draw-number")
const newGameSection = document.querySelector(".new-game")

const drawNumberBtn = document.getElementById("draw-number-btn")
const drawnNumber = document.getElementById("drawn-number")

const playAgainBtn = document.getElementById("play-again-btn")

const gameBoardSection = document.querySelector(".game-board")

const userCardsSection = document.querySelector(".user-cards")

// PREPARE GAME
const prepareGame = () => {
  // Resets
  gameBoardSection.innerText = ""
  userCardsSection.innerText = ""
  drawnNumbers = []
  userCards = []

  // Get desired amount of user cards
  const numberOfCards = cardsNumberInput.value

  // Prepare UI
  prepareGameSection.classList.add("hide-section")
  drawNumberSection.classList.remove("hide-section")
  drawnNumber.innerText = "Draw number when you're ready!"

  buildGameBoard()
  buildUserCards(numberOfCards)
}
letsPlayBtn.addEventListener("click", prepareGame)

// BUILD GAME BOARD
const buildGameBoard = () => {
  for (let i = 0; i < bingoNumbers; i++) {
    const gameCell = document.createElement("div")
    gameCell.classList.add("game-cell")
    gameCell.innerText = i + 1
    gameBoardSection.appendChild(gameCell)
  }
}

// BUILD USER CARDS
const buildUserCards = (numberOfCards) => {
  for (let j = 0; j < numberOfCards; j++) {
    // New card array
    const newCardArray = []
    // New card div
    const newCardDiv = document.createElement("div")
    newCardDiv.classList.add("user-card")
    for (let i = 0; i < numberOfCardCells; i++) {
      // Generate random number and push it to new card array
      const randomNumber = Math.floor(Math.random() * bingoNumbers) + 1
      newCardArray.push(randomNumber)

      // New card cell
      const newUserCell = document.createElement("div")
      newUserCell.classList.add("card-cell")
      newUserCell.innerText = randomNumber

      // Append newyly created cell to card div
      newCardDiv.appendChild(newUserCell)
    }
    // Push newly created card array into global array of user cards
    userCards.push(newCardArray)
    // Append newyly created card div to html section of user cards
    userCardsSection.appendChild(newCardDiv)
  }
}

// DRAW NUMBER
const drawNumber = () => {
  // Generate random number until it doesn't exist on the global
  let randomNumber
  do {
    randomNumber = Math.floor(Math.random() * bingoNumbers) + 1
  } while (drawnNumbers.includes(randomNumber))

  drawnNumbers.push(randomNumber)
  drawnNumber.innerText = randomNumber
  markGameBoard(randomNumber)
  markUserBoards(randomNumber)
  checkGameFinished()
}
drawNumberBtn.addEventListener("click", drawNumber)

// MARK GAME BOARD
const markGameBoard = (number) => {
  const cells = document.querySelectorAll(".game-cell")
  cells[number - 1].classList.add("drawn")
}

// MARK USER BOARD
const markUserBoards = (number) => {
  const allUserCells = document.querySelectorAll(".card-cell")
  for (let i = 0; i < allUserCells.length; i++) {
    if (parseInt(allUserCells[i].innerText) === number) {
      allUserCells[i].classList.add("drawn")
    }
  }
}

// CHECK IF GAME IS FINISHED
const checkGameFinished = () => {
  userCards.forEach((card) => {
    let counter = 0
    card.forEach((cell) => {
      if (drawnNumbers.includes(cell)) {
        counter++
      }
      if (counter === numberOfCardCells) {
        drawNumberSection.classList.add("hide-section")
        newGameSection.classList.remove("hide-section")
      }
    })
  })
}

playAgainBtn.addEventListener("click", () => {
  newGameSection.classList.add("hide-section")
  prepareGame()
})
