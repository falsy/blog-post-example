import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Finger extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={'finger'}>
      	{this.props.fingerNo}번째 손가락
      </div>
    );
  }
}

Finger.propTypes = {
  fingerNo: PropTypes.number
};

export default Finger