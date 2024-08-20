import TestClass from '../src/index';

describe('Test 1', function() {

  beforeEach(function() {
    // Reset
    TestClass.resetTestValue();
  });

  it('Init Value', function() {
    expect(TestClass.testValue).toEqual(0);
  });

  it('Set Test Value', function() {
    const newValue = 2;
    TestClass.setTestValue(newValue);
    expect(TestClass.testValue).toEqual(newValue);
  });

});