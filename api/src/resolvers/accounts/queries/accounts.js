const Account = require('../../../db/Account')

module.exports = (_, args, account) => {
  return Account.query()
};
