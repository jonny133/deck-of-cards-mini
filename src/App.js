import React from 'react';
import Card from './Card';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStandardDeck } from './deckUtils';
import './App.scss';

// Redux action types
const DRAW = 'DRAW';
const INCREMENT_DRAW_NUM = 'INCREMENT_DRAW_NUM';
const DECREMENT_DRAW_NUM = 'DECREMENT_DRAW_NUM';
const SORT = 'SORT';
const SHUFFLE = 'SHUFFLE';
const TOGGLE_FACE = 'TOGGLE_FACE';
const SORT_DRAWN = 'SORT_DRAWN';
const RESET = 'RESET';

// Redux default state object
const standardDeck = createStandardDeck();
const defaultState = {
  cards: [...standardDeck],
  numberToDraw: 4,
  drawnCards: null,
  faceUpDeck: true,
};

// Generic sorting using standard deck
const sort = cards => {
  let sortedCards = [];
  for (let i = 0; i < standardDeck.length; i += 1) {
    if (cards.includes(standardDeck[i])) {
      sortedCards.push(standardDeck[i]);
    }
  }
  return sortedCards;
};

// Generic random array shuffling
const shuffle = cards => {
  // Knuth-Fisher-Yates shuffle algorithm
  console.log(cards);
  let arr = [...cards];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

// Redux reducer - alter state based on action type
const reducer = (state = defaultState, action) => {
  const { faceUpDeck, cards, numberToDraw, drawnCards } = state;

  switch (action.type) {
    case INCREMENT_DRAW_NUM:
      return {
        ...state,
        numberToDraw: Math.min(cards.length, numberToDraw + 1),
      };

    case DECREMENT_DRAW_NUM:
      return {
        ...state,
        numberToDraw: Math.max(numberToDraw - 1, 0),
      };

    case DRAW:
      if (numberToDraw > cards.length) {
        return;
      }

      let cutCards = [...cards];
      let drawn = cutCards.splice(0, numberToDraw);

      return { ...state, drawnCards: drawn, cards: cutCards };

    case RESET:
      const { faceUpDeck: fUD, ...others } = defaultState;
      return { faceUpDeck, ...others };

    case SORT:
      return { ...state, cards: sort(cards) };

    case SORT_DRAWN:
      return { ...state, drawnCards: sort(drawnCards) };

    case SHUFFLE:
      return { ...state, cards: shuffle(cards) };

    case TOGGLE_FACE:
      return { ...state, faceUpDeck: !faceUpDeck };

    default:
      return state;
  }
};

// Redux basic action creators
const drawCards = () => {
  return { type: DRAW };
};
const incrementDrawNum = () => {
  return { type: INCREMENT_DRAW_NUM };
};
const decrementDrawNum = () => {
  return { type: DECREMENT_DRAW_NUM };
};
const sortDrawnCards = () => {
  return { type: SORT_DRAWN };
};
const reset = () => {
  return { type: RESET };
};
const sortCards = () => {
  return { type: SORT };
};
const shuffleCards = () => {
  return { type: SHUFFLE };
};
const toggleFaceUp = () => {
  return { type: TOGGLE_FACE };
};

// Main app
const App = props => {
  const { faceUpDeck, cards, numberToDraw, drawnCards } = props.state;

  return (
    <div className="App">
      <h1 className="title">Deck of Cards</h1>
      {/* // Main section - cards in deck and button to shuffle/sort */}
      <section className="content section">
        <div className="box">
          <div className="cardContainer">
            {cards.map(card => (
              <Card
                key={card}
                value={card[0]}
                suit={card[1]}
                faceUp={faceUpDeck}
              />
            ))}
          </div>
          <button
            onClick={() => props.shuffleCards()}
            className="button is-primary btn--shuffle"
          >
            Shuffle deck
          </button>
          <button
            onClick={() => props.sortCards()}
            className="button is-link is-outlined btn--sort"
          >
            Sort
          </button>
        </div>
      </section>

      {/* // Middle section - choose number of cards to draw, draw and sort them */}
      <section className="section content">
        <div className="box">
          <h2 className="title">Draw cards</h2>
          <button
            onClick={() => props.decrementDrawNum()}
            className="button btn--draw-one-less"
          >
            -
          </button>
          <button
            onClick={() => props.drawCards()}
            className="button is-primary btn--draw"
          >
            Draw top {numberToDraw}
          </button>
          <button
            onClick={() => props.incrementDrawNum()}
            className="button btn--draw-one-more"
          >
            +
          </button>
          {drawnCards && (
            <h3>
              <br />
              Drawn cards
            </h3>
          )}
          <div className="cardContainer">
            {drawnCards &&
              drawnCards.map(card => (
                <Card key={card} value={card[0]} suit={card[1]} faceUp={true} />
              ))}{' '}
          </div>
          {drawnCards && (
            <button
              onClick={() => props.sortDrawnCards()}
              className="button is-link is-outlined"
            >
              Sort drawn cards
            </button>
          )}
        </div>
      </section>

      {/* // Bottom section - options */}
      <section className="section content">
        <div id="options" className="box">
          <h2 className="title">Options</h2>
          <label>
            <input
              type="checkbox"
              name="cardsFaceUp"
              value={faceUpDeck}
              onChange={() => props.toggleFaceUp()}
              defaultChecked
            />
            Cards face up
          </label>
          <label className="has-text-grey-light">
            <input type="checkbox" className="disabled" disabled readOnly />
            Enable animation (not implemented yet)
          </label>

          <button
            onClick={() => props.reset()}
            className="reset button is-danger btn--reset"
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
};

const store = createStore(reducer);
const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    drawCards: () => {
      dispatch(drawCards());
    },
    incrementDrawNum: () => {
      dispatch(incrementDrawNum());
    },
    decrementDrawNum: () => {
      dispatch(decrementDrawNum());
    },
    sortDrawnCards: () => {
      dispatch(sortDrawnCards());
    },
    reset: () => {
      dispatch(reset());
    },
    sortCards: () => {
      dispatch(sortCards());
    },
    shuffleCards: () => {
      dispatch(shuffleCards());
    },
    toggleFaceUp: () => {
      dispatch(toggleFaceUp());
    },
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default AppWrapper;
