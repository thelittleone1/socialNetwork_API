const router = require("express").Router();


// Requiring routes from thought-controllers
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughtControler");

// Setting the Routes Up
router.route("/").get(getAllThoughts);
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);
router.route("/:userID").post(createThought);
router.route("/:thoughtID/reactions").post(addReaction);
router.route("/:thoughtID/reactions/:reactionID").delete(deleteReaction);

module.exports = router;