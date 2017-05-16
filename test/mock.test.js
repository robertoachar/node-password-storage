jest.mock('crypto');

const lib = require('../src/index');

describe('MOCK tests', () => {

  test('should return an error when generating a salt', (done) => {
    lib.generateSalt(32, (err, salt) => {
      expect(err).toBe('Mocking random bytes');
      expect(salt).toBeUndefined();

      done();
    });
  });

  test('should return an error when generating a hash', (done) => {
    lib.generateHash('password', 'salt', (err, hash) => {
      expect(err).toBe('Mocking pbkdf2');
      expect(hash).toBeUndefined();

      done();
    });
  });

  test('should return an error when generating a storage', (done) => {
    lib.generateStorage('password', (err, hash) => {
      expect(err).toBe('Mocking random bytes');
      expect(hash).toBeUndefined();

      done();
    });
  });

  test('should return an error when verifying a storage', (done) => {
    const storage = 'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:J6fMDmoEmpRDHifaQsjXQWJPY0Np0lIk04XrFjbyd+s=';

    lib.verifyStorage(undefined, storage, (err, hash) => {
      expect(err).toBe('Mocking pbkdf2');
      expect(hash).toBeUndefined();

      done();
    });
  });

});
