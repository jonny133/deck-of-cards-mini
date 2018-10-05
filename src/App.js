import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
import './App.css';

const deckCreator = () => {
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
};

const suits = deckCreator();
const standardDeck = [
  ...suits.clubs,
  ...suits.spades,
  ...suits.hearts,
  ...suits.diamonds,
];

const Card = props => {
  const suitIconMap = {
    c: '♣',
    s: '♠',
    h: '♥',
    d: '♦',
  };

  const val = props.value === 'T' ? '10' : props.value;
  const suit = props.suit;

  let cardContent = '';
  let cardStyle = 'card';
  if (!props.faceUp) {
    cardContent += ' card__facedown';
    cardStyle += ' card--back';
  }
  if (props.suit === 'd' || props.suit === 'h') {
    cardContent += ' card--red-suit';
  }

  return (
    <div className={cardStyle}>
      <div className={cardContent}>
        <div className="value">{val}</div>
        <div className="suit">{suitIconMap[suit]}</div>
        <div className="suit--bottom">{suitIconMap[suit]}</div>
        <div className="value--bottom">{val}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [...standardDeck],
      numberToDraw: 4,
      drawnCards: null,
      faceUpDeck: false,
    };

    this.shuffle = this.shuffle.bind(this);
    this.sort = this.sort.bind(this);
    this.incrementDrawNum = this.incrementDrawNum.bind(this);
    this.decrementDrawNum = this.decrementDrawNum.bind(this);
    this.draw = this.draw.bind(this);
    this.sortDrawnCards = this.sortDrawnCards.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleFaceUp = this.toggleFaceUp.bind(this);
  }

  shuffle() {
    // Knuth-Fisher-Yates shuffle algorithm
    let arr = this.state.cards;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    this.setState({ cards: arr });
  }

  sort() {
    let sortedDeck = [];

    for (let i = 0; i < standardDeck.length; i += 1) {
      if (this.state.cards.includes(standardDeck[i])) {
        sortedDeck.push(standardDeck[i]);
      }
    }

    this.setState({ cards: sortedDeck });
  }

  incrementDrawNum() {
    this.setState(prevState => ({
      numberToDraw: Math.min(
        prevState.numberToDraw + 1,
        this.state.cards.length,
      ),
    }));
  }

  decrementDrawNum() {
    this.setState(prevState => ({
      numberToDraw: Math.max(0, prevState.numberToDraw - 1),
    }));
  }

  draw(sorted = true) {
    const { numberToDraw, cards } = this.state;

    // // increment/decrement counters limit this now.
    // if (numberToDraw > this.state.cards.length) {
    //   throw 'Cannot draw that many cards.';
    // } else if (numberToDraw < 1) {
    //   throw 'Must draw 1 card or more.';
    // }

    if (numberToDraw > cards.length) {
      return;
    }

    let cutCards = [...cards];
    let drawn = cutCards.splice(0, numberToDraw);

    // for (let i = 0; i < numberToDraw; i += 1) {
    //   drawnCards.push(this.state.cards.shift());
    // }

    this.setState({
      drawnCards: drawn,
      cards: cutCards,
    });

    // return drawn;
  }

  sortDrawnCards() {
    const { drawnCards } = this.state;
    let sortedCards = [];
    for (let i = 0; i < standardDeck.length; i += 1) {
      if (drawnCards.includes(standardDeck[i])) {
        sortedCards.push(standardDeck[i]);
      }
    }

    this.setState({
      drawnCards: sortedCards,
    });
  }

  reset() {
    this.setState({
      cards: [...standardDeck],
      numberToDraw: 4,
      drawnCards: null,
    });
  }

  toggleFaceUp() {
    this.setState(prevState => ({
      faceUpDeck: !prevState.faceUpDeck,
    }));
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {deck.cards}
        </header> */}
        <h1>Deck of Cards</h1>
        <div className="cardContainer">
          {this.state.cards.map(card => (
            <Card
              value={card[0]}
              suit={card[1]}
              faceUp={this.state.faceUpDeck}
            />
          ))}
        </div>
        <button onClick={this.shuffle}>Shuffle deck</button>
        <button onClick={this.sort}>Sort</button>

        <div>
          <h2>Draw cards</h2>
          <button onClick={this.decrementDrawNum}>-</button>
          {/* {this.state.numberToDraw} */}

          {/* <br /> */}
          <button onClick={this.draw}>
            Draw top {this.state.numberToDraw}
          </button>
          <button onClick={this.incrementDrawNum}>+</button>
          {this.state.drawnCards && (
            <h3>
              <br />
              Drawn cards:
            </h3>
          )}
          <div className="cardContainer">
            {this.state.drawnCards &&
              this.state.drawnCards.map(card => (
                <Card value={card[0]} suit={card[1]} faceUp={true} />
              ))}{' '}
          </div>
          {this.state.drawnCards && (
            <button onClick={this.sortDrawnCards}>Sort drawn cards</button>
          )}
          {/* {this.state.drawnCards} */}
        </div>

        <footer>
          <div>
            <button onClick={this.reset} className="reset">
              Reset
            </button>
            <br />
            <input
              type="checkbox"
              name="cardsFaceUp"
              value={this.state.faceUpDeck}
              checked={this.state.faceUpDeck}
              onClick={this.toggleFaceUp}
            />
            Cards face up
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
