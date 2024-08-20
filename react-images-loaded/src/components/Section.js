import React, { PureComponent } from 'react';

export default (Comp) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);

      this.imgPromiseList = [];
      this.imgLoaded = this.imgLoaded.bind(this);
    }

    componentDidMount() {
      Promise.all(this.imgPromiseList).then(() => {
        console.log('이미지가 모두 로드 되었습니다.');
      });
    }

    imgLoaded(imgPromise) {
      this.imgPromiseList.push(imgPromise);
    }

    render() {
      return (
        <section>
          <Comp {...{ ...this.props, imgLoaded: this.imgLoaded }} />
        </section>
      );
    }
  };
};