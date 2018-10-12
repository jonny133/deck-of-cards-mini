import React from 'react';
import PropTypes from 'prop-types';

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
    cardContent += 'card__facedown';
    cardStyle += ' card--back';
  }
  if (props.suit === 'd' || props.suit === 'h') {
    cardContent += ' card--red-suit';
  }

  return (
    <div className={`${cardStyle}`}>
      {/* <div className={cardContent}> */}
      <div className={`value ${cardContent}`}>{val}</div>
      <div className={`suit ${cardContent}`}>{suitIconMap[suit]}</div>
      <div className={`suit--bottom ${cardContent}`}>{suitIconMap[suit]}</div>
      <div className={`value--bottom ${cardContent}`}>{val}</div>
      {/* </div> */}
    </div>
  );
};

Card.propTypes = {
  suit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Card;
