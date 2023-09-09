const router = require("express").Router();
const {
    getAllThought,
    postThought,
    getSingleThought
} = require('../../controller/thoughtController')

router.route("/").get(getAllThought).post(postThought)
router.route("/:thoughtId").get(getSingleThought)
module.exports = router;