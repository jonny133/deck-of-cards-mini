import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount, render } from 'enzyme';

describe('app', () => {
  const app = shallow(<App />);

  const standardDeckExplicit = [
    '2c',
    '3c',
    '4c',
    '5c',
    '6c',
    '7c',
    '8c',
    '9c',
    'Tc',
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
    'Ts',
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
    'Th',
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
    'Td',
    'Jd',
    'Qd',
    'Kd',
    'Ad',
  ];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('initialises with the standard 52 card deck in order', () => {
    expect(app.state().cards).toEqual(standardDeckExplicit);
  });

  it('initialises with no cards drawn', () => {
    expect(app.state().drawnCards).toBe(null);
  });

  // it('shows cards face down by default', () => {
  //   expect(app.state().faceUpDeck).toBe(false);
  // });

  it('resets when reset button pressed', () => {
    app.find('.btn--reset').simulate('click');
    expect(app.state().cards).toEqual(standardDeckExplicit);
    expect(app.state().drawnCards).toBe(null);
  });

  describe('when sorting a shuffled deck without drawing any cards', () => {
    it('produces the original standard 52 card deck', () => {
      app.find('.btn--shuffle').simulate('click');
      app.find('.btn--sort').simulate('click');
      expect(app.state().cards).toEqual(standardDeckExplicit);
    });
  });

  describe('when the shuffle button is clicked', () => {
    afterEach(() => {
      app.setState({ cards: standardDeckExplicit });
    });

    it('shuffles deck into random order', () => {
      app.find('.btn--shuffle').simulate('click');
      expect(app.state().cards).not.toEqual(standardDeckExplicit);
    });
  });

  describe('when trying to draw cards', () => {
    it('starts with a default number of cards to draw of 4', () => {
      expect(app.state().numberToDraw).toBe(4);
    });
  });

  describe('when trying to draw 6 cards from scratch', () => {
    beforeAll(() => {
      app.setState({
        cards: [...standardDeckExplicit],
        numberToDraw: 4,
        drawnCards: null,
      });
    });

    const top6Cards = app.state().cards.slice(0, 6);

    it('increases number of cards to draw by two when plus button clicked twice', () => {
      app.find('.btn--draw-one-more').simulate('click');
      app.find('.btn--draw-one-more').simulate('click');
      expect(app.state().numberToDraw).toBe(6);
    });
    it('draws 6 cards from the deck', () => {
      app.find('.btn--draw').simulate('click');
      expect(app.state().drawnCards).toHaveLength(6);
    });

    it('removed those top 6 cards from the deck', () => {
      // removes 6 cards from the deck
      expect(app.state().cards).toHaveLength(52 - 6);

      // drawn cards are valid cards from the top of the deck
      expect(app.state().drawnCards).toEqual(top6Cards);

      expect(
        app.state().drawnCards.some(v => standardDeckExplicit.includes(v)),
      ).toBe(true);

      // no common cards between drawn cards and remaining deck.
      expect(
        app.state().drawnCards.some(v => app.state().cards.includes(v)),
      ).toBe(false);
    });
  });

  describe('when trying to draw 2 cards from scratch', () => {
    const top2Cards = app.state().cards.slice(0, 2);

    beforeAll(() => {
      app.setState({
        cards: [...standardDeckExplicit],
        numberToDraw: 4,
        drawnCards: null,
      });
    });

    it('decreases number of cards to draw by two when minus button clicked twice', () => {
      app.find('.btn--draw-one-less').simulate('click');
      app.find('.btn--draw-one-less').simulate('click');
      expect(app.state().numberToDraw).toBe(2);
    });

    it('draws 2 cards from the deck', () => {
      app.find('.btn--draw').simulate('click');
      expect(app.state().drawnCards).toHaveLength(2);
    });

    it('removed those top 2 cards from the deck', () => {
      // removes 2 cards from the deck
      expect(app.state().cards).toHaveLength(52 - 2);

      // drawn cards are valid cards from the top of the deck
      expect(app.state().drawnCards).toEqual(top2Cards);

      expect(
        app.state().drawnCards.some(v => standardDeckExplicit.includes(v)),
      ).toBe(true);

      // no common cards between drawn cards and remaining deck.
      expect(
        app.state().drawnCards.some(v => app.state().cards.includes(v)),
      ).toBe(false);
    });
  });

  // it('renders correctly', () => {
  //   expect(app).toMatchSnapshot();
  // });
  describe('when changing number of cards to draw', () => {
    it('does not allow negative number of cards', () => {
      // TODO
    });

    it('does not allow drawing more cards than available in deck', () => {
      // TODO
    });
  });
});
