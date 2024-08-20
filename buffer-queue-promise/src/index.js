import Buffer from './Buffer';

const basicRequest1 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('basic request1 start');
      resolve('ok');
    }, 2000);
  });
};
const basicRequest2 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('basic requset2 start');
      resolve('ok');
    }, 1000);
  });
};
const request1 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('request1 start');	
      resolve('ok');
    }, 2000);
  });
};
const request2 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('request2 start');
      resolve('ok');
    }, 1000);
  });
};

const pro1 = basicRequest1();
const pro2 = basicRequest2();

const req1 = Buffer(request1);
const req2 = Buffer(request2);