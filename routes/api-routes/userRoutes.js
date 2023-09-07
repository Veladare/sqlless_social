const router = require("express").Router();
const {
    getAllUser,
    createUser,
    getSingleUser,
    deleteSingleUser,
    updateUser

} = require('../../controller/userController')

router.route("/").get(getAllUser).post(createUser)

router.route('/:userId').get(getSingleUser).delete(deleteSingleUser).put(updateUser)

module.exports = router;
