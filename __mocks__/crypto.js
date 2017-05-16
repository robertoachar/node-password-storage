const crypto = jest.genMockFromModule('crypto');

function randomBytes() {
  throw new Error('Mocking randomBytes');
}

crypto.randomBytes = randomBytes;

module.exports = crypto;
