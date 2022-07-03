// Connection routes to server
const router = require("express").Router();
const userRoutes = require("");
const thoughtRoutes = require("");

router.use("/user", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;