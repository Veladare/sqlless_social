const {User, Thought} = require('../models')

const thoughtController = {
    
    getAllThought: async (req, res) => {
      try {
        const dbThoughtData = await Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 });
  
        res.json(dbThoughtData);
      } catch (err) {
        console.error(err);
        res.sendStatus(400);
      }
    },
  };

  module.exports = thoughtController