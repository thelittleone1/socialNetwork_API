// Express router
const router = require("express").Router();

// Importing API routes
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("Wrong Route");
});

module.exports = router;