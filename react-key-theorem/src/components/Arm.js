import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Finger from './Finger';

class Arm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={'arm'}>
      	팔
      	<Finger fingerNo={this.props.fingerNo} />
      </div>
    );
  }
}

Arm.propTypes = {
  fingerNo: PropTypes.number
};

export default Arm