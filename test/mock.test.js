jest.mock('crypto');

const lib = require('../src/index');

describe('TESTS', () => {

  describe('Mock', () => {

    test('should return an error when generating a salt', (done) => {
      lib.generateSalt((err, salt) => {
        expect(err).toBe('Mocking random bytes');
        expect(salt).toBeUndefined();

        done();
      });
    });

    test('should return an error when generating a hash', (done) => {
      lib.generateHash('secret', 'hash', (err, hash) => {
        expect(err).toBe('Mocking pbkdf2');
        expect(hash).toBeUndefined();

        done();
      });
    });

    test('should return an error when generating a storage', (done) => {
      lib.generateStorage('secret', (err, hash) => {
        expect(err).toBe('Mocking random bytes');
        expect(hash).toBeUndefined();

        done();
      });
    });

    test('should return an error when generating a storage', (done) => {
      lib.generateStorage(undefined, (err, hash) => {
        expect(err).toBe('Mocking random bytes');
        expect(hash).toBeUndefined();

        done();
      });
    });

    test('should return an error when verifying a hash', (done) => {
      lib.verifyStorage('secret', 'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:J6fMDmoEmpRDHifaQsjXQWJPY0Np0lIk04XrFjbyd+s=', (err, hash) => {
        expect(err).toBe('Mocking pbkdf2');
        expect(hash).toBeUndefined();

        done();
      });
    });

  });

});
