const lib = require('../src/index');

describe('HASH tests', () => {
  test('should return a hash', (done) => {
    lib.generateHash('password', 'salt', (err, hash) => {
      expect(err).toBeNull();
      expect(hash.length).toBe(32);
      expect(hash.toString('hex')).toBe(
        '0c234bcd7a2c01c584f93f960bcdae1fe86c4b0694b5e562d3e9e7f67e0e5cdf'
      );

      done();
    });
  });

  test('should throws an error', (done) => {
    expect(() => {
      lib.generateHash(undefined, undefined);
    }).toThrow();

    done();
  });
});
