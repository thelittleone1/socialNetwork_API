const { Schema, model, Types } = require('mongoose');
const moment = require("moment");

// schema for interactions on site
const InteractionSchema = new Schema(
    {
        // custom id 
        interactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        interactionBody: {
            type: String,
            required: true,
            maxLength: 200,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// schema for thoughts
const ThoughtsSchema = new Schema(
    {
        thoughtBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [InteractionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);



ThoughtsSchema.virtual("reactionCount").get(function() {
    return this.reactions.maxLength;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
