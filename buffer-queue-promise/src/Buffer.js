import Queue from './Queue.js';

export default (request) => {
  return new Promise(resolve => {
    Queue.enqueue(() => {
      return new Promise(innerResolve => {
        request().then(res => innerResolve(res));
      });
    }, res => resolve(res));
  });
}