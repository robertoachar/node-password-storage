jest.mock('crypto');

const lib = require('../src/index');

describe('MOCK tests', () => {
  test('should return an error when generating a storage', (done) => {
    lib.generateStorage('password', (err, hash) => {
      expect(err).toBeDefined();
      expect(hash).toBeUndefined();

      done();
    });
  });
});
