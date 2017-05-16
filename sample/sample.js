/* eslint no-console: 0 */

const lib = require('../src/index');

lib.generateSalt(32, (err, salt) => {
  if (err) return console.error(err);

  console.log(`SALT: ${salt.toString('hex')}`);
});

lib.generateHash('password', 'salt', (err, hash) => {
  if (err) return console.error(err);

  console.log(`HASH: ${hash.toString('hex')}`);
});

lib.generateStorage('password', (err, storage) => {
  if (err) return console.error(err);

  console.log(`STORAGE: ${storage}`);
});

// const password = undefined;

// lib.generateStorage(password, (err, storage) => {
//   if (err) return console.error(err.message);

//   const params = storage.split(':');
//   console.log(`SALT => ${params[0]}`);
//   console.log(`HASH => ${params[1]}`);
//   console.log();

//   lib.verifyStorage(password, storage, (err, success) => {
//     if (err) return console.error(err);

//     console.log(`Passwords match: ${success}`);
//   });
// });
