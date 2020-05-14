const mongoose = require('mongoose');
const Account = require('./Account');
const chance = require('chance').Chance();

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/my_database'
require('./bootstrap-mongoose')

async function createAccounts() {

  await Account.find({}).remove(async function() {

    const userAdmin = new Account({username: 'Admin', role: 'admin'});
    await userAdmin.setPassword('Password321');
    await userAdmin.save();
    await Account.authenticate()('Admin', 'Password321');

    let i = 0
    let count = 10
    while (i < count) {
      let username = chance.email();
      const user = new Account({
        provider: 'local',
        username: username,
        firstName: chance.first(),
        lastName: chance.last(),
        password: 'Password123'
      });
      await user.setPassword('Password123');
      await user.save();
      await Account.authenticate()(username, 'Password123');
      i++
    }
    mongoose.connection.close()
  }) 
}

createAccounts().catch(error => console.error(error.stack));
