/* eslint no-console: 0 */

const lib = require('../src/index');

const password = undefined;

lib.generateStorage(password, (err, storage) => {
  if (err) return console.error(err.message);

  const params = storage.split(':');
  console.log(`SALT => ${params[0]}`);
  console.log(`HASH => ${params[1]}`);
  console.log();

  lib.verifyStorage(password, storage, (err, success) => {
    if (err) return console.error(err);

    console.log(`Passwords match: ${success}`);
  });
});
