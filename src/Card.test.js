import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import { shallow, mount, render } from 'enzyme';

describe('card', () => {
  const card = shallow(<Card value="T" suit="d" />);
  it('shows `10`', () => {
    
  });
});
