const { Schema, Types } = require('mongoose');
const { User } = require('.');

const UserSchema = new Schema(

    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "Users"
        }]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;