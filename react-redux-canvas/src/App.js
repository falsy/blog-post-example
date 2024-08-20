import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store';
import './style/main.scss';

import Dashboard from './views/dashboard';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}

export default App