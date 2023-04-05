// Hacer tests de shuffleArray y setCards
function testShuffleArray() {
  const cards = [
    { id: 2, type: "yellow" },
    { id: 6, type: "orange" },
    { id: 9, type: "red" },
    { id: 11, type: "blue" },
    { id: 4, type: "violet" },
    { id: 5, type: "brown" },
  ];

  console.assert(
    JSON.stringify(shuffleArray(cards)) !== JSON.stringify(cards),
    "Error in shuffleArray"
  );
}

function testCreateCards() {
  const colors = ["yellow", "orange", "red", "blue"];
  const cards = createCards(colors);

  console.assert(
    JSON.stringify(cards) ===
      JSON.stringify([
        { id: 0, type: "yellow" },
        { id: 1, type: "orange" },
        { id: 2, type: "red" },
        { id: 3, type: "blue" },
      ]),
    "Error in create cards"
  );
}

testShuffleArray();
testCreateCards();
