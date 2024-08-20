const assert = require('assert');
const { toUpperCase } = require('../src/service/functions');

describe('Github Actions Test', () => {
  it('toUpperCase', () => {
  	const textText = 'hello world';
    assert.equal(toUpperCase(textText), 'HELLO WORLD');
  });
});
