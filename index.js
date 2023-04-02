function mixNumberArray(numbersArray) {
  for (let index = 0; index < numbersArray.length; index++) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentNumber = numbersArray[index];
    numbersArray[index] = numbersArray[randomIndex];
    numbersArray[randomIndex] = currentNumber;
  }
  return numbersArray;
}

function createArrayOfNumbers(maxNumber, minNumber) {
  const array = [];
  for (let index = minNumber; index <= maxNumber; index++) {
    array.push(index);
  }
  return array;
}

function deleteBoard() {
  const $grid = document.querySelectorAll(".row");

  for (let index = 0; index < $grid.length; index++) {
    const $row = $grid[index];
    $row.remove();
  }
}

function renderAlertWin(rounds) {
  const $alertWin = document.querySelector(".alert-win");
  const $buttonRestart = document.createElement("button");

  $buttonRestart.className = "btn btn-primary";
  $buttonRestart.style.fontSize = "25px";
  $buttonRestart.textContent = "Reiniciar";
  $buttonRestart.onclick = restart;

  $alertWin.textContent = `Felicidades. Ganaste en ${rounds} rondas`;
  $alertWin.appendChild($buttonRestart);

  $alertWin.classList.remove("d-none");
}

function restart() {
  location.reload();
}

function checkIfWin(rounds) {
  const $squares = document.querySelectorAll(".col");
  let counter = 0;

  $squares.forEach(($square) => {
    if ($square.style.backgroundColor) {
      counter++;
    }
  });

  if (counter === $squares.length) {
    deleteBoard();
    renderAlertWin(rounds);
  }
}

function listenClickInSquares() {
  const $squaresCont = document.querySelector("#root");
  const userSequence = [];
  let rounds = 0;

  $squaresCont.addEventListener("click", (e) => {
    const $square = e.target;

    if (!$square.style.backgroundColor) {
      userSequence.push($square);
    }

    $square.style.backgroundColor = $square.id;

    if (userSequence.length === 2) {
      rounds++;
      if (userSequence[0].id !== userSequence[1].id) {
        setTimeout(() => {
          userSequence[0].style.backgroundColor = "";
          userSequence[1].style.backgroundColor = "";
        }, 100);
      }

      setTimeout(() => {
        userSequence.splice(0);
        checkIfWin(rounds);
      }, 150);
    }
  });
}

function assignSquaresColor(squaresQuantityMix) {
  const $squares = document.querySelectorAll(".col");
  const colors = [
    "red",
    "orange",
    "yellow",
    "brown",
    "blue",
    "violet",
    "red",
    "orange",
    "yellow",
    "brown",
    "blue",
    "violet",
  ];

  squaresQuantityMix.forEach((number, index) => {
    $squares[number].id = colors[index];
  });
}

(function main() {
  const squaresQuantity = createArrayOfNumbers(11, 0);
  const squaresQuantityMix = mixNumberArray(squaresQuantity);

  assignSquaresColor(squaresQuantityMix);
  listenClickInSquares();
})();
