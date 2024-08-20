import React, { Component } from 'react';
import Arm from './Arm';
import Leg from './Leg';

class Person extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	fingerNo: 1,
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
  	const newFingerNo = this.state.fingerNo > 4 ? 1 : this.state.fingerNo + 1;
  	this.setState({
  		fingerNo: newFingerNo
  	});
  }

  render() {
    return (
      <div id={'person'}>
      	<h1>사람</h1>
      	<p>피부색은 {this.state.skin}</p>
      	<Arm fingerNo={this.state.fingerNo} />
      	<Leg />
      	<button onClick={this.changeSkin.bind(this)}>피부색 바꾸기</button>
      	<button onClick={this.changeFinger.bind(this)}>손가락 바꾸기</button>
      </div>
    );
  }
}

export default Person