const crypto = jest.genMockFromModule('crypto');

function pbkdf2(password, salt, ITERATIONS, HASH_SIZE, ALGORITHM, done) {
  return done('Mocking pbkdf2');
}

function randomBytes(size, done) {
  return done('Mocking random bytes');
}

crypto.pbkdf2 = pbkdf2;
crypto.randomBytes = randomBytes;

module.exports = crypto;
