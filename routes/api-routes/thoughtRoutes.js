const router = require("express").Router();
const {
    getAllThought,
    postThought,
    getSingleThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controller/thoughtController')

router.route("/").get(getAllThought).post(postThought)

router.route("/:thoughtId").get(getSingleThought).delete(removeThought).put(updateThought)

router.route('/:thoughtId/reaction').post(addReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction)

module.exports = router;