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
};

module.exports = thoughtController;