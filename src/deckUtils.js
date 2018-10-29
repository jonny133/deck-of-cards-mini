export function deckCreator() {
  const cardValues = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
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
  return suits;
}

export const createStandardDeck = () => {
  const suits = deckCreator();
  const standardDeck = [
    ...suits.clubs,
    ...suits.spades,
    ...suits.hearts,
    ...suits.diamonds,
  ];
  return standardDeck;
};
