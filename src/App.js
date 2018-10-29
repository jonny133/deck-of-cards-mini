import React, { Component } from 'react';
import Card from './Card';
import { createStandardDeck } from './deckUtils';
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [...standardDeck],
      numberToDraw: 4,
      drawnCards: null,
      faceUpDeck: true,
    };

    // this.shuffle = this.shuffle.bind(this);
    // this.sort = this.sort.bind(this);
    // this.incrementDrawNum = this.incrementDrawNum.bind(this);
    // this.decrementDrawNum = this.decrementDrawNum.bind(this);
    // this.draw = this.draw.bind(this);
    // this.sortDrawnCards = this.sortDrawnCards.bind(this);
    // this.reset = this.reset.bind(this);
    // this.toggleFaceUp = this.toggleFaceUp.bind(this);
  }
const standardDeck = createStandardDeck();

  shuffle = () => {
    // Knuth-Fisher-Yates shuffle algorithm
    let arr = this.state.cards;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    this.setState({ cards: arr });
  };

  sort = () => {
    let sortedDeck = [];

    for (let i = 0; i < standardDeck.length; i += 1) {
      if (this.state.cards.includes(standardDeck[i])) {
        sortedDeck.push(standardDeck[i]);
      }
    }

    this.setState({ cards: sortedDeck });
  };

  incrementDrawNum = () => {
    this.setState(prevState => ({
      numberToDraw: Math.min(
        prevState.numberToDraw + 1,
        this.state.cards.length,
      ),
    }));
  };

  decrementDrawNum = () => {
    this.setState(prevState => ({
      numberToDraw: Math.max(0, prevState.numberToDraw - 1),
    }));
  };

  draw = (sorted = true) => {
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
  };

  sortDrawnCards = () => {
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
  };

  reset = () => {
    this.setState({
      cards: [...standardDeck],
      numberToDraw: 4,
      drawnCards: null,
    });
  };

  toggleFaceUp = () => {
    this.setState(prevState => ({
      faceUpDeck: !prevState.faceUpDeck,
    }));
  };

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {deck.cards}
        </header> */}

        <section className="content section">
          <h1 className="title">Deck of Cards</h1>
          <div className="box">
            <div className="cardContainer">
              {this.state.cards.map(card => (
                <Card
                  key={card}
                  value={card[0]}
                  suit={card[1]}
                  faceUp={this.state.faceUpDeck}
                />
              ))}
            </div>
            <button
              onClick={this.shuffle}
              className="button is-primary btn--shuffle"
            >
              Shuffle deck
            </button>
            <button onClick={this.sort} className="button btn--sort">
              Sort
            </button>
          </div>
        </section>

        <section className=" section content">
          <div className="box">
            <h2 className="title">Draw cards</h2>
            <button
              onClick={this.decrementDrawNum}
              className="button btn--draw-one-less"
            >
              -
            </button>
            {/* {this.state.numberToDraw} */}

            {/* <br /> */}
            <button onClick={this.draw} className="button is-primary btn--draw">
              Draw top {this.state.numberToDraw}
            </button>
            <button
              onClick={this.incrementDrawNum}
              className="button btn--draw-one-more"
            >
              +
            </button>
            {this.state.drawnCards && (
              <h3>
                <br />
                Drawn cards
              </h3>
            )}
            <div className="cardContainer">
              {this.state.drawnCards &&
                this.state.drawnCards.map(card => (
                  <Card
                    key={card}
                    value={card[0]}
                    suit={card[1]}
                    faceUp={true}
                  />
                ))}{' '}
            </div>
            {this.state.drawnCards && (
              <button
                onClick={this.sortDrawnCards}
                className="button is-success"
              >
                Sort drawn cards
              </button>
            )}
            {/* {this.state.drawnCards} */}
          </div>
        </section>

        <section className="section content">
          <div id="options" className="box">
            <h2 className="title">Options</h2>

            <label>
              <input
                type="checkbox"
                name="cardsFaceUp"
                value={this.state.faceUpDeck}
                checked={this.state.faceUpDeck}
                onChange={this.toggleFaceUp}
              />{' '}
              Cards face up
            </label>
            <label className="has-text-grey-light">
              <input type="checkbox" className="disabled" disabled readOnly />{' '}
              Enable animation (not implemented yet)
            </label>
            <br />
            <br />

            <button
              onClick={this.reset}
              className="reset button is-danger btn--reset"
            >
              Reset
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
