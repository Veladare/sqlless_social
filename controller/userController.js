const {User, Thought} = require('../models')

const userController = {
    
    getAllUser: async (req, res) => {
      try {
        const dbUserData = await User.find({})
          .populate({
            path: "friends",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 });
  
        res.json(dbUserData);
      } catch (err) {
        console.error(err);
        res.sendStatus(400);
      }
      
    },
    async createUser(req, res) {
      try {
        const createUser = await User.create(req.body);
        res.json(createUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
  

  module.exports = userController