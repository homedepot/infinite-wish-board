const mongoose = require('mongoose')
const Account = require('./Account')
const Wish = require('./Wish')
const chance = require('chance').Chance()
const wishRouter = require('../routes/wish')
var _ = require('lodash');


process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/my_database'
require('./bootstrap-mongoose')

createAccounts = async () => {

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
    //mongoose.connection.close()
  }) 
}

createWishes = async () => {
  Wish.collection.drop()
  await Wish.find({}).remove(async function() {
    let i = 0
    let count = 10
    let wishTypes = [wishRouter.GO, wishRouter.MEET, wishRouter.HAVE, wishRouter.BE]
    while (i < count) {
      const wish = new Wish({
        child: {
          name: chance.first(),
          hometown: chance.city(),
          illness: chance.word(),
          age: chance.age({ type: 'child' })
        },
        type: _.sample(wishTypes),
        details: chance.sentence({ words: 5 }),
        sponsor: {
          name: chance.first(),
          logo: 'K',
          links: []
        },
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      await wish.save();
      i++
    }
  }) 
}

createAccounts().catch(error => console.error(error.stack))
createWishes().catch(error => console.error(error.stack))

