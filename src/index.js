// Dependencies
const crypto = require('crypto');

// Storage constants
const ALGORITHM = 'sha256';
const HASH_SIZE = 32;
const ITERATIONS = 64000;
const SALT_SIZE = 32;

// Index constants
const INDEX = 2;
const SALT_INDEX = 0;
const HASH_INDEX = 1;

module.exports.generatePassword = (password, done) => {
  // Generate a salt
  crypto.randomBytes(SALT_SIZE, (err, salt) => {
    if (err) return done(err);

    // Hash password
    crypto.pbkdf2(password, salt, ITERATIONS, HASH_SIZE, ALGORITHM, (err, hash) => {
      if (err) return done(err);

      // Encode both salt and hash
      salt = new Buffer(salt).toString('base64');
      hash = new Buffer(hash).toString('base64');

      // Create a storage
      const storage = `${salt}:${hash}`;

      // Return storage
      return done(null, storage);
    });
  });
};

module.exports.verifyPassword = (password, storage, done) => {
  // Load parameters
  const params = storage.split(':');

  // Check parameters
  if (params.length !== INDEX) {
    return done('Paremeters length is invalid');
  }

  // Check salt
  const salt = new Buffer(params[SALT_INDEX], 'base64');
  if (salt.length !== SALT_SIZE) {
    return done('Salt is invalid');
  }

  // Check hash
  const hash = new Buffer(params[HASH_INDEX], 'base64');
  if (hash.length !== HASH_SIZE) {
    return done('Hash is invalid');
  }

  // Compare passwords
  crypto.pbkdf2(password, salt, ITERATIONS, HASH_SIZE, ALGORITHM, (err, key) => {
    if (err) return done(err);

    // Slow compare
    if (!slowEquals(hash, key)) {
      return done('Passwords not match');
    }

    // Hashs match
    done(null, true);
  });
};

function slowEquals(a, b) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < a.length && i < b.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
