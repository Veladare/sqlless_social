const router = require("express").Router();
const {
    getAllUser,
    createUser,
    getSingleUser,
    deleteSingleUser

} = require('../../controller/userController')

router.route("/").get(getAllUser).post(createUser)

router.route('/:userId').get(getSingleUser).delete(deleteSingleUser)

module.exports = router;
