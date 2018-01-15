const lib = require('../src/index');

describe('STORAGE tests', () => {
  test('should return a storage', (done) => {
    lib.generateStorage('secret', (err, storage) => {
      if (err) return done(err);

      expect(storage).toBeDefined();

      const params = storage.split(':');
      expect(params.length).toBe(2);

      const salt = new Buffer(params[0], 'base64');
      expect(salt.length).toBe(32);

      const hash = new Buffer(params[1], 'base64');
      expect(hash.length).toBe(32);

      done();
    });
  });

  test('should not equals', (done) => {
    lib.generateStorage('secret', (err, storage1) => {
      lib.generateStorage('secret', (err, storage2) => {
        const params1 = storage1.split(':');
        const salt1 = params1[0];
        const hash1 = params1[1];

        const params2 = storage2.split(':');
        const salt2 = params2[0];
        const hash2 = params2[1];

        expect(salt1).not.toEqual(salt2);
        expect(hash1).not.toEqual(hash2);

        done();
      });
    });
  });

  test('should return an error', (done) => {
    lib.generateStorage(undefined, (err, storage) => {
      expect(err).toBeDefined();
      expect(storage).toBeUndefined();

      done();
    });
  });
});
