const lib = require('../src/index');

describe('SLOW tests', () => {

  test('should match', (done) => {
    const a = new Buffer('1234567890');
    const b = new Buffer('1234567890');

    const match = lib.slowEquals(a, b);
    expect(match).toBe(true);

    done();
  });

  test('should not match', (done) => {
    const a = new Buffer('1234567890');
    const b = new Buffer('0987654321');

    const match = lib.slowEquals(a, b);
    expect(match).toBe(false);

    done();
  });

});
