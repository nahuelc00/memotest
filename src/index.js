function mixArray(array) {
  for (let index = 0; index < array.length; index++) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentNumber = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = currentNumber;
  }
  return array;
}

function createArrayOfNumbers(maxNumber, minNumber) {
  const array = [];
  for (let index = minNumber; index <= maxNumber; index++) {
    array.push(index);
  }
  return array;
}

function listenClickInSquare() {
  const $squaresCont = document.querySelector("#root");
  $squaresCont.addEventListener("click", (e) => {
    const $square = e.target;
    $square.style.backgroundColor = $square.id;
    console.log($square);
  });
}

function assignSquaresColor(numbersMix) {
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

  numbersMix.forEach((number, index) => {
    $squares[number].id = colors[index];
  });
}

(function main() {
  const numbers = createArrayOfNumbers(11, 0);
  const numbersMix = mixArray(numbers);
  assignSquaresColor(numbersMix);
})();
