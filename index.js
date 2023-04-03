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

function checkIfWin() {
  const $squares = document.querySelectorAll(".col");
  let counter = 0;

  $squares.forEach(($square) => {
    if ($square.style.backgroundColor) {
      counter++;
    }
  });

  if (counter === $squares.length) {
    return true;
  } else {
    return false;
  }
}

function paintCard($card) {
  $card.style.backgroundColor = $card.getAttribute("type");
}

function unpaintCard($card) {
  $card.style.backgroundColor = "";
}

function checkWin(rounds) {
  const win = checkIfWin();
  if (win) {
    deleteBoard();
    renderAlertWin(rounds);
  }
}

function handlerCards(cardsShuffled) {
  const $squaresCont = document.querySelector("#root");
  let rounds = 0;
  let cardsFlipped = [];
  const cardsActives = [];

  $squaresCont.addEventListener("click", (e) => {
    const $card = e.target;
    paintCard($card);

    const cardClicked = cardsShuffled.find(
      (card) => card.id === Number($card.id)
    );
    const isActivedCard = cardsActives.find((card) => card === cardClicked);

    if (cardClicked === cardsFlipped[0]) {
      console.log("Entre al if");
      console.log(cardsFlipped[0]);
    } else if (!isActivedCard) {
      cardsFlipped.push(cardClicked);
    }

    if (cardsFlipped.length === 2) {
      rounds++;
      if (cardsFlipped[0].type !== cardsFlipped[1].type) {
        setTimeout(() => {
          unpaintCard(document.getElementById(`${cardsFlipped[0].id}`));
          unpaintCard(document.getElementById(`${cardsFlipped[1].id}`));
        }, 200);
      } else {
        cardsActives.push(cardsFlipped[0]);
        cardsActives.push(cardsFlipped[1]);
      }

      setTimeout(() => {
        cardsFlipped = [];
        checkWin(rounds);
      }, 250);
    }
  });
}

function setInfoInCardsEls(cardsShuffled) {
  const $cards = document.querySelectorAll(".col");

  $cards.forEach(($card, index) => {
    const card = cardsShuffled[index];
    $card.setAttribute("type", card.type);
    $card.id = card.id;
  });
}

function getAndSetCards(colors) {
  const cardsList = [];
  let id = 0;

  colors.forEach((color) => {
    const card = {
      id: id++,
      type: color,
    };

    cardsList.push(card);
  });

  return cardsList;
}

function shuffleCards(cards) {
  for (let index = 0; index < cards.length; index++) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentNumber = cards[index];
    cards[index] = cards[randomIndex];
    cards[randomIndex] = currentNumber;
  }
}

(function main() {
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

  const cards = getAndSetCards(colors);

  shuffleCards(cards);
  setInfoInCardsEls(cards);
  handlerCards(cards);
})();
