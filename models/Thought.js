const {Schema, model, Types} = require("mongoose");


function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );


const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

  
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("Thought", thoughtSchema);
  
  module.exports = Thought;