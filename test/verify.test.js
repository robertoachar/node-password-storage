const lib = require('../src/index');

describe('VERIFY tests', () => {
  test('should return invalid parameters', (done) => {
    const storage = '';

    lib.verifyStorage('secret', storage, (err, success) => {
      expect(err).toBe('Paremeters length is invalid');
      expect(success).toBe(undefined);

      done();
    });
  });

  test('should return invalid salt', (done) => {
    const storage = 'salt:hash';

    lib.verifyStorage('secret', storage, (err, success) => {
      expect(err).toBe('Salt is invalid');
      expect(success).toBe(undefined);

      done();
    });
  });

  test('should return invalid hash', (done) => {
    const storage = 'KyHLAVL8MHOTLTT/FgqXB+OQF7LxC6jOdXXyHSEPehY=:hash';

    lib.verifyStorage('secret', storage, (err, success) => {
      expect(err).toBe('Hash is invalid');
      expect(success).toBe(undefined);

      done();
    });
  });

  test('should not match', (done) => {
    const storage =
      'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=';

    lib.verifyStorage('secret', storage, (err, success) => {
      expect(err).toBe('Passwords not match');
      expect(success).toBe(undefined);

      done();
    });
  });

  test('should match', (done) => {
    const storage =
      'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:J6fMDmoEmpRDHifaQsjXQWJPY0Np0lIk04XrFjbyd+s=';

    lib.verifyStorage('secret', storage, (err, success) => {
      expect(err).toBe(null);
      expect(success).toBe(true);

      done();
    });
  });

  test('should return an error', (done) => {
    const storage =
      'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:J6fMDmoEmpRDHifaQsjXQWJPY0Np0lIk04XrFjbyd+s=';

    lib.verifyStorage(undefined, storage, (err, success) => {
      expect(err).toBeDefined();
      expect(success).toBeUndefined();

      done();
    });
  });
});
