import React, { PureComponent } from 'react';

class Img extends PureComponent {
  constructor(props) {
    super(props);
    this.imgPromise = new Promise(resolve => {
      this.onImageLoaded = () => {
        resolve();
      };
    });
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  componentDidMount() {
    this.props.imgLoaded(this.imgPromise);
  }

  componentWillUnmount() {
    this.onImageLoaded();
  }

  render() {
    const { src, width, height, alt } = this.props;
    return (
      <img
        onLoad={this.onImageLoaded}
        onError={this.onImageLoaded}
        {...{ src, width, height, alt }}
      />
    );
  }
}

export default Img;