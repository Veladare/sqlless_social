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
          return res.status(404).json({ message: 'No user found with this id' });
        }
    
        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async updateThought(req, res) {
      try {
        const updateThought = await Thought.findByIdAndUpdate(
          { _id: req.params.thoughtId },
          req.body,
          { new: true }
        );
    
        if (!updateThought) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        
        res.json({message: 'Thought successfully updated', updateThought});
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async removeThought(req, res) {
      try {
        const removeThought = await Thought.findByIdAndDelete(
          { _id: req.params.thoughtId }, 
          { runValidators: true, new: true });
    
        if (!removeThought) {
          return res.status(404).json({ message: 'No thought found with this ID!' });
        }
    
        res.json({message: 'Thought successfully deleted', removeThought});
      } catch (err) {
        res.status(500).json(err);
      }
  
    },
    async addReaction(req, res) {
      try {
        const addReaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { runValidators: true, new: true }
        );
        console.log(addReaction)
    
        if (!addReaction) {
          return res.status(404).json({ message: 'Incorrect field data used or thought not found' });
        }
    
      
        res.json({ message: 'Thought successfully added', addReaction });
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    },
    async removeReaction(req, res) {
      try {
          const reaction = await Thought.findOneAndUpdate(
              {_id: req.params.thoughtId},
              {$pull: {reactions: {reactionId: req.params.reactionId}}},
              { runValidators: true, new: true }
          );
          console.log(reaction)
  
          if (!reaction) {
              return res
                  .status(404)
                  .json({ message: 'No reaction found with that ID :(' });
          }
  
          res.json({message:'Reaction successfully deleted', reaction});
      } catch (err) {
          res.status(500).json(err);
      }
  },


  }

  module.exports = thoughtController