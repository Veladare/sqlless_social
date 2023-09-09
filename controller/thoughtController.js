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
    async getSingleThought (req, res){
      try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v");

      if (!thought){
        return res.status(404).json({ message: 'no thought with that ID'})
      }
      
      res.json(thought)
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async postThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
    
        if (!thought) {
          return res.status(400).json({ message: 'Invalid thought data' });
        }
    
        const dbThoughtData = await User.findOneAndUpdate(
          { _id: req.body.userId }, 
          { $push: { thoughts: thought._id } },
          { new: true }
        );
    
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
    
        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };

  module.exports = thoughtController