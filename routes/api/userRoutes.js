const router = require("express").Router();

// Requring routes from user controlls
const {
    createUser, 
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addAFriend,
    deleteAFriend
} = require("../../controllers/userController");

// Setting the routes up
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:id/friends/:friendID").post(addAFriend).delete(deleteAFriend);

module.exports = router;