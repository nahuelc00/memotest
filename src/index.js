function deleteBoard() {
  const $grid = document.querySelectorAll(".row-game");

  for (let index = 0; index < $grid.length; index++) {
    const $row = $grid[index];
    $row.remove();
  }
}

function renderAlertWinAndDeleteBoard(rounds) {
  const $alertWin = document.querySelector(".alert-win");
  const $textWin = document.createElement("p");
  const $buttonRestart = document.createElement("button");
  const $cards = document.querySelectorAll(".card-game");

  $buttonRestart.className = "btn-restart btn btn-primary";
  $buttonRestart.textContent = "Reiniciar";
  $buttonRestart.onclick = restart;

  $textWin.innerHTML = `Felicidades.<br/>Ganaste en<strong> ${rounds}</strong> rondas`;
  $textWin.classList.add("m-0");

  $alertWin.appendChild($textWin);
  $alertWin.appendChild($buttonRestart);

  $cards.forEach(($card) => {
    $card.classList.remove("m-1");
  });

  setTimeout(() => {
    $alertWin.classList.remove("d-none");
    deleteBoard();
  }, 800);
}

function restart() {
  location.reload();
}

function checkIfWin(cardsActives) {
  return cardsActives.length === 12;
}

function paintCard($card, cardsShuffled) {
  const cardId = Number($card.id);
  const cardFound = cardsShuffled.find((card) => cardId === card.id);
  const cardColor = cardFound.type;
  $card.classList.add(cardColor);
}

function unpaintCard($card, cardFlipped) {
  const cardColor = cardFlipped.type;
  $card.classList.remove(cardColor);
}

function disableClick() {
  const $contCards = document.querySelector("#root");
  $contCards.classList.add("disable-click");
}

function enableClick() {
  const $contCards = document.querySelector("#root");
  $contCards.classList.remove("disable-click")
}

function checkWin(rounds, cardsActives) {
  const win = checkIfWin(cardsActives);

  if (win) {
    renderAlertWinAndDeleteBoard(rounds);
  }
}

function handleCards(cardsShuffled) {
  const $cardsCont = document.querySelector("#root");
  let rounds = 0;
  let cardsFlipped = [];
  const cardsActives = [];

  $cardsCont.addEventListener("click", (e) => {
    const $card = e.target;

    if ($card.classList.contains("card-game")) {
      paintCard($card, cardsShuffled);

      const cardClicked = cardsShuffled.find(
        (card) => card.id === Number($card.id)
      );
      const isActivedCard = cardsActives.find((card) => card === cardClicked);

      if (cardClicked === cardsFlipped[0]) {
      } else if (!isActivedCard) {
        cardsFlipped.push(cardClicked);
      }

      if (cardsFlipped.length === 2) {
        disableClick();
        rounds++;
        if (cardsFlipped[0].type !== cardsFlipped[1].type) {
          setTimeout(() => {
            unpaintCard(
              document.getElementById(`${cardsFlipped[0].id}`),
              cardsFlipped[0]
            );
            unpaintCard(
              document.getElementById(`${cardsFlipped[1].id}`),
              cardsFlipped[1]
            );
          }, 200);
        } else {
          cardsActives.push(cardsFlipped[0]);
          cardsActives.push(cardsFlipped[1]);
        }

        setTimeout(() => {
          cardsFlipped = [];
          enableClick();
          checkWin(rounds, cardsActives);
        }, 220);
      }
    }
  });
}

function setIdInCardsEls(cardsShuffled) {
  const $cards = document.querySelectorAll(".card-game");

  $cards.forEach(($card, index) => {
    const card = cardsShuffled[index];
    $card.id = card.id;
  });
}

function createCards(colors) {
  const cardsList = [];

  colors.forEach((color, i) => {
    const card = {
      id: i++,
      type: color,
    };

    cardsList.push(card);
  });

  return cardsList;
}

function shuffleArray(array) {
  const arrayCopied = [];

  array.map((item) => {
    arrayCopied.push(item);
  });

  for (let index = 0; index < arrayCopied.length; index++) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentPosition = arrayCopied[index];
    arrayCopied[index] = arrayCopied[randomIndex];
    arrayCopied[randomIndex] = currentPosition;
  }
  return arrayCopied;
}

(function main() {
  const baseColors = ["red", "orange", "yellow", "brown", "blue", "violet"];
  const colorsRepeated = baseColors.concat(baseColors);

  const cards = createCards(colorsRepeated);
  const cardsShuffled = shuffleArray(cards);

  setIdInCardsEls(cardsShuffled);
  handleCards(cardsShuffled);
})();
