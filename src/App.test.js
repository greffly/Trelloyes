import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Card from './Card';
import List from './List';
import renderer from 'react-test-renderer';

describe('Telloyes Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<div className='App-list' />)
      //somehow add .length to see how many cards are rendered?
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
