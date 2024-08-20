import React from 'react';
import ReactDOM from 'react-dom';

import Example from './components/Example';
import Section from './components/Section';

const ExampleComp = Section(Example);

const App = () => (
  <div>
  	<ExampleComp />
  </div>
)
ReactDOM.render(<App />, document.getElementById('wrap'))