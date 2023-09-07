const router = require("express").Router();
const {
    getAllUser,
    createUser,

} = require('../../controller/userController')

router.route("/").get(getAllUser).post(createUser)

module.exports = router;
