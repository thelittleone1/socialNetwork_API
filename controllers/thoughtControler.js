// Import Model
const {Thoughts, Users} = require("../models");

// Controlers for Thoughts
const thoughtController = {

    // GET all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // GET thought by ID
    getThoughtById( { params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json("Error, no thought associated with this ID");
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Create (PUT) Thought
    createThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userID }, { $push: { thoughts: _id }}, { new: true, runValidators: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json("Error, thought not created");
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    // UPDATE Thoughts
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-___v")
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json("Error, thought not found");
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE Thoughts
    deleteThought({ params }, res) {
        Thoughts.findOneAndRemove({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json("Error, thought not found");
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // CREATE reactions
    addReaction({ params, body}, res) {
        console.log(params);
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtID },
            { $push: { reactions: body }}, 
            { new: true, runValidators: true }
        )
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json("Error, thought not found");
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE Reaction
    deleteReaction({ params }, res) {
        console.log(res);
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtID },
            { $pull: { reactions: { interactionId: params.reactionID }}},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json("Error, reaction not found");
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


};

module.exports = thoughtController;