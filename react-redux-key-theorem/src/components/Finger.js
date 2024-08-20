import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Finger extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={'finger'}>
        {this.props.finger.number}번째 손가락
      </div>
    );
  }
}

Finger.propTypes = {
  fingerNo: PropTypes.number
};

const mstp = (state) => {
  return {
    finger: state.finger
  };
};

export default connect(mstp)(Finger)