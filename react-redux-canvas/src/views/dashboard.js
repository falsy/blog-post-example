import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCanvas } from '../actions/canvas';
import { printMarble, animationMarble } from '../actions/marble';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const canvas = document.getElementById('sample');
    dispatch(setCanvas(canvas));
    printMarble(canvas);
  }

  startAnimation() {
    animationMarble(this.props.canvas.element);
  }

  render() {
    return (
      <div>
        <canvas id={'sample'} width={'500'} height={'500'}></canvas>
        <p onClick={this.startAnimation.bind(this)}>애니메이션</p>
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    canvas: state.canvas
  };
};

export default connect(mstp)(Dashboard)