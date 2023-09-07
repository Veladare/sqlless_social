const router = require("express").Router();
const {getAllThought} = require('../../controller/thoughtController')

router.route("/").get(getAllThought)

module.exports = router;