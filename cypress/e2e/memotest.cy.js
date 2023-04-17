const URL = "127.0.0.1:8080";

function organizeCardsByColor(cardsArray) {
  const cardsByColor = [];

  for (let index = 0; index < cardsArray.length; index++) {
    const card = cardsArray[index];
    for (let indexAux = 0; indexAux < cardsArray.length; indexAux++) {
      const cardAux = cardsArray[indexAux];
      if (card.color === cardAux.color && card.id !== cardAux.id) {
        cardsByColor.push({
          color: card.color,
          ids: [card.id, cardAux.id],
        });
      }
    }
  }

  return cardsByColor;
}

function reduceCards(cardsByColorArray, baseColors) {
  const cardsReduced = [];
  baseColors.map((color) => {
    const card = cardsByColorArray.find((card) => {
      return card.color === color;
    });
    cardsReduced.push(card);
  });
  return cardsReduced;
}

context("Memotest", () => {
  const cardsQuantity = 12;

  it("verifica que haya " + cardsQuantity + " cartas en el tablero", () => {
    cy.visit(URL);
    cy.get(".card-game").should("have.length", cardsQuantity);
  });

  it("verifica que los cartas sean aleatorias", () => {
    const $cardsList = [];
    const $cardsListNew = [];

    cy.visit(URL);
    cy.get(".card-game").each(($card) => {
      $cardsList.push($card);
    });

    cy.visit(URL);
    cy.get(".card-game").each(($card) => {
      $cardsListNew.push($card);
    });

    cy.wrap($cardsListNew).should("not.deep.equal", $cardsList);
  });

  describe("resolución del juego", () => {
    const cards = [];
    const baseColors = ["red", "orange", "yellow", "brown", "blue", "violet"];

     it("verifica que seleccionando dos cartas distintas no queden cartas pintadas en el tablero", () => {

         cy.visit(URL);
         
         // Assemble cards
         cy.get(".card-game").each(($card) => {
             cy.wrap($card).click().then(() => {
                 baseColors.map((color) => {
                   if ($card[0].className.includes(color)) {
                     cards.push({
                       id: $card[0].id,
                       color,
                     });
                   }
                 });
               });
           })
           .then(() => {
             const cardsByColor = organizeCardsByColor(cards);
             const cardsReduced = reduceCards(cardsByColor, baseColors);

               cy.visit(URL);
               cy.get(`#${cardsReduced[0].ids[0]}`).click();
               cy.get(`#${cardsReduced[1].ids[0]}`).click();

               console.log(cards);
               debugger;

              cy.get(".card-game").each(($card) => {
                cy.wrap($card).should("have.css","background-color","rgba(0, 0, 0, 0)");
              });
           });   
     });

     it("verifica que el juego se resuelva correctamente",()=>{

             const cardsByColor = organizeCardsByColor(cards);
             const cardsReduced = reduceCards(cardsByColor, baseColors);
    
             cy.visit(URL);

             cardsReduced.map((card) => {
               const id = Number(card.ids[0]);
               const idAux = Number(card.ids[1]);
               cy.wait(250);
               cy.get(`#${id}`).click();
               cy.get(`#${idAux}`).click();
             });
           });
     })
  });
