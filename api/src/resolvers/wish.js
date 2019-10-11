const Wish = require('../db/Wish')

module.exports = {
  Query: {
    wishes: async () => {
      const wish = await Wish.find();
      console.log(wish);
      return wish;
    },
    wish: async (parent, { id }) => {
      return await Wish.findById(id);
    },
  },

  Mutation: {
    createWish: async (parent, { child, details, type }) => {
      const wish = await Wish.create({
        child: child,
        details: details,
        type: type,
      });

      return wish;
    },
  },
};