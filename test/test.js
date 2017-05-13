const lib = require('../src/index');

describe('TESTS', () => {

  describe('Generate', () => {

    test('should return a storage', (done) => {
      lib.generatePassword('secret', (err, storage) => {
        if (err) return done(err);

        const params = storage.split(':');
        expect(params.length).toBe(2);

        done();
      });
    });

    test('should generate a salt', (done) => {
      lib.generatePassword('secret', (err, storage) => {
        if (err) return done(err);

        const params = storage.split(':');
        const salt = new Buffer(params[0], 'base64');
        expect(salt.length).toBe(32);

        done();
      });
    });

    test('should generate a hash', (done) => {
      lib.generatePassword('secret', (err, storage) => {
        if (err) return done(err);

        const params = storage.split(':');
        const hash = new Buffer(params[1], 'base64');
        expect(hash.length).toBe(32);

        done();
      });
    });

  });

  describe('Verify', () => {

    test('should return invalid parameters', (done) => {
      const storage = '';

      lib.verifyPassword('secret', storage, (err, success) => {
        expect(err).toBe('Paremeters length is invalid');
        expect(success).toBe(undefined);

        done();
      });
    });

    test('should return invalid salt', (done) => {
      const storage = 'salt:hash';

      lib.verifyPassword('secret', storage, (err, success) => {
        expect(err).toBe('Salt is invalid');
        expect(success).toBe(undefined);

        done();
      });
    });

    test('should return invalid salt', (done) => {
      const storage = 'KyHLAVL8MHOTLTT/FgqXB+OQF7LxC6jOdXXyHSEPehY=:hash';

      lib.verifyPassword('secret', storage, (err, success) => {
        expect(err).toBe('Hash is invalid');
        expect(success).toBe(undefined);

        done();
      });
    });

    test('should not match', (done) => {
      const storage = 'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=';

      lib.verifyPassword('secret', storage, (err, success) => {
        expect(err).toBe('Passwords not match');
        expect(success).toBe(undefined);

        done();
      });
    });

    test('should match', (done) => {
      const storage = 'CoYyMqXHRHjXEtTbggtEhXjM1jETlVn0sLsv/TiUGhY=:J6fMDmoEmpRDHifaQsjXQWJPY0Np0lIk04XrFjbyd+s=';

      lib.verifyPassword('secret', storage, (err, success) => {
        expect(err).toBe(null);
        expect(success).toBe(true);

        done();
      });
    });

  });

});
