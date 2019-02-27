namespace functions {
  let myAdd: (baseValue: number, increment: number) => number =
    function (x: number, y: number): number { return x + y; };

  function buildName(firstName: string, lastName = 1) {
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
  }

  let result1 = buildName("Bob");  // works correctly now
  let result3 = buildName("Bob", 1);  // ah, just right
  let a: number[] = [1, 2, 4]
  let b: string[] = ['1', '2']
  let c: any[] = [1, '2', 'a', 3]
  interface Card {
    suit: string;
    card: number;
  }
  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
  }
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
      // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  alert("card: " + pickedCard.card + " of " + pickedCard.suit);
}