class Queue {

  constructor() {
    this.inProgress = false;
    this.queue = [];
  }
  
  enqueue(method, callback) {
    this.queue.push({
      method: method,
      callback: callback
    });
    this.autoAction();
  }
  
  front() {
    return this.queue[0];
  }
  
  dequeue() {
    this.queue.shift();
  }
  
  clear() {
    this.inProgress = false;
    this.queue = [];
  }
  
  isEmpty() {
    return this.queue.length === 0;
  }
  
  autoAction() {
    if(this.inProgress === false) {
      this.inProgress = true;
      this.action();
    }
  }
  
  async action() {
    const result = await this.front().method();
    this.front().callback(result);

    this.dequeue();

    if(this.isEmpty()) {
      this.clear();
    } else {
      this.action();
    }
  }
}

export default new Queue()
