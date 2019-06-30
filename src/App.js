import React, { Component } from 'react';
import List from './List';
import './App.css';
import './store.js';

const newRandomCard = () => {
  const id =
    Math.random()
      .toString(36)
      .substring(2, 4) +
    Math.random()
      .toString(36)
      .substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum'
  };
};

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : { ...newObj, [key]: value },
    {}
  );
}

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {}
    }
  };

  state = {
    lists: this.props.store.lists,
    allCards: this.props.store.allCards
  };

  handleAddCard(card, listId) {
    console.log('handle add card', { card });
    let newLists = this.state.lists;
    newLists[listId - 1].cardIds.push(card.id);
    let allCards = this.state.allCards;
    allCards[card.id] = card;
    this.setState({
      lists: newLists,
      allCards: allCards
    });
  }

  handleDeleteCard(cardId) {
    const { lists, allCards } = this.state.store;
    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id != cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    });
  }

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Telloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.props.store.allCards[id])}
              handleAddCard={listID => {
                this.handleAddCard(newRandomCard(), listID);
              }}
              handleDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
