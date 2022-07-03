const { Schema, model } = require('mongoose');

// User schema 
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
            // trim: true,
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
            getters: true,
        },
        id: false,
    }
);

// Get users friend count 
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

// Creating instance of user via the userschema
const User = model("User", UserSchema);

module.exports = User;