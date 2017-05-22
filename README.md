# Node Password Storage

> The best way to protect passwords is to employ salted password hashing.

[![Travis Status][travis-badge]][travis-url]
[![AppVeyor Status][appveyor-badge]][appveyor-url]
[![CircleCI Status][circleci-badge]][circleci-url]
[![Coveralls Status][coveralls-badge]][coveralls-url]
[![NPM Version][npm-badge]][npm-url]
[![License][license-badge]][license-url]

## Installation

### Prerequsites

* Install [Node.js](https://nodejs.org)
* Install [npm](https://www.npmjs.com/)

Install package:

```bash
$ npm install --save node-password-storage
```

## Usage

Generate a salt

```javascript
const lib = require('node-password-storage');

const salt_size = 32;

lib.generateSalt(salt_size, (err, salt) => {
  if (err) return console.error(err);

  console.log(`SALT: ${salt.toString('hex')}\n`);
});
```

Generate a hash

```javascript
const lib = require('node-password-storage');

const password = 'password';
const salt = 'salt';

lib.generateHash(password, salt, (err, hash) => {
  if (err) return console.error(err);

  console.log(`HASH: ${hash.toString('hex')}\n`);
});
```

To generate and compare a storage

```javascript
const lib = require('node-password-storage');

const password = 'password';

lib.generateStorage(password, (err, storage) => {
  if (err) return console.error(err.message);

  const params = storage.split(':');
  console.log(`SALT => ${params[0]}`);
  console.log(`HASH => ${params[1]}`);

  lib.verifyStorage(password, storage, (err, success) => {
    if (err) return console.error(err);

    console.log(`MATCH: ${success}`);
  });
});
```

## Development

* Clone the repo

```bash
$ git clone https://github.com/robertoachar/node-password-storage.git
```

* Install dependencies

```bash
$ npm install
```

Action | Usage
---    | ---
Starting development mode                | `npm start`
Linting code                             | `npm run lint`
Running unit tests                       | `npm run jest`
Running code coverage                    | `npm run coverage`
Running lint + tests                     | `npm test`
Sending coverage results to Coveralls.io | `npm run coveralls`

## Author
[Roberto Achar](https://twitter.com/RobertoAchar)

## License
[MIT](https://github.com/robertoachar/node-password-storage/blob/master/LICENSE)

[travis-badge]: https://travis-ci.org/robertoachar/node-password-storage.svg?branch=master
[travis-url]: https://travis-ci.org/robertoachar/node-password-storage

[appveyor-badge]: https://ci.appveyor.com/api/projects/status/github/robertoachar/node-password-storage?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/robertoachar/node-password-storage

[circleci-badge]: https://circleci.com/gh/robertoachar/node-password-storage/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/robertoachar/node-password-storage

[coveralls-badge]: https://coveralls.io/repos/github/robertoachar/node-password-storage/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/robertoachar/node-password-storage?branch=master

[npm-badge]: https://img.shields.io/npm/v/node-password-storage.svg
[npm-url]: https://www.npmjs.com/package/node-password-storage

[license-badge]: https://img.shields.io/github/license/robertoachar/node-password-storage.svg
[license-url]: https://opensource.org/licenses/MIT
