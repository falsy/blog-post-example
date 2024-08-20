import React, {Component} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import SafeMargin from './SafeMargin';

class DashboardFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <View style={styles.footer}>
          <SafeMargin />
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/home-icon.png')} style={{
                width: 26,
                height: 24,
            }}/>
          </View>
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/search-icon.png')} style={{
                width: 24,
                height: 24,
            }}/>
          </View>
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/plus-icon.png')} style={{
                width: 28,
                height: 28,
            }}/>
          </View>
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/heart-icon.png')} style={{
                width: 28,
                height: 25,
            }}/>
          </View>
          <View style={styles.footerIcon}>
            <Image source={require('../imgs/my-icon.png')} style={{
                width: 22,
                height: 22,
            }}/>
          </View>
          <SafeMargin />
        </View>
        <View style={styles.footerIndicator}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  footerIcon: {
    flex: 1,
    alignItems: 'center',
  },
  footerIndicator: {
    height: 22,
    backgroundColor: '#f5f5f5',
  }
});

export default DashboardFooter
