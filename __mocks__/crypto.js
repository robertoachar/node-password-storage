const crypto = jest.genMockFromModule('crypto');

crypto.randomBytes = () => {
  throw new Error('Mocking randomBytes');
};

module.exports = crypto;
