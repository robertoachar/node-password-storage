/* eslint no-console: 0 */

const lib = require('../src/index');

const password = 'secret';

lib.generatePassword(password, (err, hash) => {
  if (err) return console.error(err.message);

  const params = hash.split(':');
  console.log(`SALT => ${params[0]}`);
  console.log(`HASH => ${params[1]}`);
  console.log();

  lib.verifyPassword(password, hash, (err, success) => {
    if (err) return console.error(err);

    console.log(`Passwords match: ${success}`);
  });
});
