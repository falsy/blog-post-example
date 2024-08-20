class TestClass {

  constructor() {
    this.resetTestValue();
  }

  resetTestValue() {
    this.testValue = 0;
  }

  setTestValue(value) {
    this.testValue = value;
  }

}

export default new TestClass()