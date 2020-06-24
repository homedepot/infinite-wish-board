const mongoose = require('mongoose')
const Account = require('./Account')
const Wish = require('./Wish')
const chance = require('chance').Chance()
const wishRouter = require('../routes/wish')
var _ = require('lodash');
var async = require('async');
var calls = [];

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/my_database'
require('./bootstrap-mongoose')

createAccounts = async () => {

  await Account.find({}).remove(async () => {
    const userAdmin = new Account({username: 'Admin', role: 'admin'});
    await userAdmin.setPassword('Password321');
    await userAdmin.save();

    [...Array(10)].forEach( async (_, i) => {
      calls.push(async () => {
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
      })
    })
    async.parallel(calls, async (err, result) => {
      if (err)
          return console.log(err);
      console.log("Seed task is completed!")
      mongoose.connection.close()
    })
  }) 
}

createWishes = async () => {
  Wish.collection.drop()
  await Wish.find({}).remove(async () => {
  
    [...Array(20)].forEach( async (wishTypes, i) => {
      wishTypes = [wishRouter.GO, wishRouter.MEET, wishRouter.HAVE, wishRouter.BE];
      const wish = new Wish({
        child: {
          name: chance.first(),
          hometown: chance.city(),
          illness: chance.word(),
          age: chance.age({ type: 'child' }),
          image: "https://www.hepl.lib.in.us/wp-content/uploads/2015/03/kids_picks.jpg"
        },
        type: _.sample(wishTypes),
        details: chance.sentence({ words: 5 }),
        sponsor: {
          name: chance.first(),
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/500px-TheHomeDepot.svg.png',
          links: []
        },
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      await wish.save();
    })
  }) 
}

createAccounts().catch(error => console.error(error.stack))
createWishes().catch(error => console.error(error.stack))