// Require User Model
const { Users } = require("../models");

// Controllers for Users
const userController = {

    // Create a User
    createUser( {body}, res) {
        Users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // GET all Users
    getAllUsers(req, res) {
        Users.find({})
        // Grab User thoughts
        .populate({ path: "thoughts", select: "-__v" })
        // Grab User Friends
        .populate({ path: "friends", select: "-__v" })
        .select("-__v")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // GET User by ID
    getUserById({params}, res) {
        Users.findOne({ _id: params.id })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json("No User found with that ID!");
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // POST (Update) User
    updateUser({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json("No User found with that ID!");
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE User
    deleteUser({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json("No User found with that ID!");
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },

    // PUT (ADD) Friend
    addAFriend({params}, res) {
        
    },
};