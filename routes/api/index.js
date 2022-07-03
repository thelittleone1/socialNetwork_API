// Connection routes to server
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoute");

router.use("/user", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;