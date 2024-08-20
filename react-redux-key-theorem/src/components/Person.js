import React, { Component } from 'react';
import { connect } from 'react-redux';
import Arm from './Arm';
import Leg from './Leg';

import { setFinger } from '../actions/finger';

class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skin: 'yellow'
    };

  }

  componentDidMount() {
    document.getElementById('person').style.background = '#f5f5f5';
  }

  changeSkin() {
    const newSkin = this.state.skin === 'yellow' ? 'black' : 'yellow';
    this.setState({
      skin: newSkin
    });
  }

  changeFinger() {
    const { dispatch } = this.props;
    dispatch(setFinger(this.props.finger.number + 1));
  }

  render() {
    return (
      <div id={'person'}>
        <h1>사람</h1>
        <p>피부색은 {this.state.skin}</p>
        <Arm />
        <Leg />
        <button onClick={this.changeSkin.bind(this)}>피부색 바꾸기</button>
        <button onClick={this.changeFinger.bind(this)}>손가락 바꾸기</button>
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    finger: state.finger
  };
};

export default connect(mstp)(Person)