import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Dashboard from './views/Dashboard';

class Route extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Dashboard />
      </View>
    );
  }
}

export default Route
