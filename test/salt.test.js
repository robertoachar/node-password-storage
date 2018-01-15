const lib = require('../src/index');

describe('SALT tests', () => {
  test('should return a salt', (done) => {
    lib.generateSalt(32, (err, salt) => {
      expect(err).toBeNull();
      expect(salt.length).toBe(32);

      done();
    });
  });

  test('should return an error', (done) => {
    lib.generateSalt(undefined, (err, salt) => {
      expect(err).toBeDefined();
      expect(salt).toBeUndefined();

      done();
    });
  });

  test('should throws an error', (done) => {
    expect(() => {
      lib.generateSalt(undefined);
    }).toThrow();

    done();
  });
});
