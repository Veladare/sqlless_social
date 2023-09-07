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
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
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
    async deleteSingleUser(req, res) {
      try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!deletedUser) {
          return res.status(404).json({ message: 'No user with that ID' });
        }

  
        res.json({ message: 'User deleted successfully', deletedUser });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async updateUser(req, res) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.userId },
          req.body,
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
    
        res.json({ message: 'User updated successfully', updatedUser });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
};

  module.exports = userController