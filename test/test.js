const storage = require('../src/index');

describe('TESTS', () => {

  test('should works', () => {
    expect(storage.parse()).toBe('It works!');
  });

});
