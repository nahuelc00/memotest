// Hacer tests de shuffleCards y setCards
function testShuffleCards() {
  const cards = [
    { id: 2, type: "yellow" },
    { id: 6, type: "orange" },
    { id: 9, type: "red" },
    { id: 11, type: "blue" },
  ];

  console.assert(
    JSON.stringify(shuffleCards(cards)) !== JSON.stringify(cards),
    "Error in shuffleCards"
  );
}

function testGetAndSetCards() {
  const colors = ["yellow", "orange", "red", "blue"];
  const cards = getAndSetCards(colors);

  console.assert(
    JSON.stringify(cards) ===
      JSON.stringify([
        { id: 0, type: "yellow" },
        { id: 1, type: "orange" },
        { id: 2, type: "red" },
        { id: 3, type: "blue" },
      ]),
    "Error in get and set cards"
  );
}

testShuffleCards();
testGetAndSetCards();
