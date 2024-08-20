import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import DashboardFooter from '../components/DashboardFooter';
import DashboardHeader from '../components/DashboardHeader';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state ={
      text: 'Hello World!'
    };
  }

  render() {
    return (
      <View style={styles.wrap}>
        <DashboardHeader />
        <View style={styles.content}>
          <Text style={styles.welcome}>{this.state.text}</Text>
        </View>
        <DashboardFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000'
  }
});

export default Dashboard
