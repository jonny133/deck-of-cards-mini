const cardValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];
const suitValues = new Map([
  ['clubs', 'c'],
  ['spades', 's'],
  ['hearts', 'h'],
  ['diamonds', 'd'],
]);
const suits = {};
suitValues.forEach((shorthand, suitName) => {
  suits[suitName] = cardValues.map(cardValue => cardValue + shorthand);
});
const deck = [
  ...suits.clubs,
  ...suits.spades,
  ...suits.diamonds,
  ...suits.hearts,
];

// const suits = suitValues.map(suit =>
//   cardValues.map(cardValue => cardValue + suit),
// );
// const suits =
// {Object.keys(suitValuesO): cardValues.map(cardValue => cardValue+suitValues[key] )

// }
// ;
// const deck = [].concat(...suits);

class Deck {
  constructor() {
    this.cards = [
      '2c',
      '3c',
      '4c',
      '5c',
      '6c',
      '7c',
      '8c',
      '9c',
      '10c',
      'Jc',
      'Qc',
      'Kc',
      'Ac',
      '2s',
      '3s',
      '4s',
      '5s',
      '6s',
      '7s',
      '8s',
      '9s',
      '10s',
      'Js',
      'Qs',
      'Ks',
      'As',
      '2h',
      '3h',
      '4h',
      '5h',
      '6h',
      '7h',
      '8h',
      '9h',
      '10h',
      'Jh',
      'Qh',
      'Kh',
      'Ah',
      '2d',
      '3d',
      '4d',
      '5d',
      '6d',
      '7d',
      '8d',
      '9d',
      '10d',
      'Jd',
      'Qd',
      'Kd',
      'Ad',
    ];
  }

  shuffle() {
    // Knuth-Fisher-Yates shuffle algorithm
    const arr = this.cards;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  draw(numberToDraw, sorted = true) {
    if (numberToDraw > this.cards.length) {
      throw 'Cannot draw that many cards.';
    } else if (numberToDraw < 1) {
      throw 'Must draw 1 card or more.';
    }
    let drawnCards = [];
    for (let i = 0; i < numberToDraw; i += 1) {
      drawnCards.push(this.cards.shift());
    }

    if (sorted) {
      let sortedCards = [];
      deck.forEach(card => {
        drawnCards.includes(card) ? sortedCards.push(card) : null;
      });
      return sortedCards;
    }

    return drawnCards;
  }

  sort() {
    let sortedDeck = [];
    deck.forEach(card => {
      this.cards.includes(card) ? sortedDeck.push(card) : null;
    });
    this.cards = sortedDeck;
  }
}
