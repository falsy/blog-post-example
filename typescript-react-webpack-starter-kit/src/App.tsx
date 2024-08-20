import * as React from 'react';
import TodoItem from './components/TodoItem';

interface Hello {
  compiler: string;
  framework: string;
}

export class App extends React.Component<Hello, {}> {
  render() {
    return (
      <h1>
        Hello from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
