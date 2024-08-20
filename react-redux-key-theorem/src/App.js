import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store';
import Person from './components/Person';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Person />
        </div>
      </Provider>
    );
  }
}