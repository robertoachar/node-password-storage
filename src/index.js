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

module.exports.generateSalt = (size, done) => {
  try {
    crypto.randomBytes(size, (err, salt) => {
      done(null, salt);
    });
  } catch (error) {
    done(error);
  }
};

module.exports.generateHash = (password, salt, done) => {
  try {
    crypto.pbkdf2(password, salt, ITERATIONS, HASH_SIZE, ALGORITHM, (err, hash) => {
      return done(null, hash);
    });
  } catch (error) {
    done(error);
  }
};

module.exports.generateStorage = (password, done) => {
  // Generate a salt
  this.generateSalt(SALT_SIZE, (err, salt) => {
    if (err) return done(err);

    // Hash password
    this.generateHash(password, salt, (err, hash) => {
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

module.exports.verifyStorage = (password, storage, done) => {
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
  this.generateHash(password, salt, (err, key) => {
    if (err) return done(err);

    // Slow compare
    if (!this.slowEquals(hash, key)) {
      return done('Passwords not match');
    }

    // Hashs match
    done(null, true);
  });
};

module.exports.slowEquals = (a, b) => {
  let diff = a.length ^ b.length;
  for (let i = 0; i < a.length && i < b.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
};
