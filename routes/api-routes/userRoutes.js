const router = require("express").Router();
const {
    getAllUser,
    createUser,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    addSingleFriend,
    removeFriend

} = require('../../controller/userController')

router.route("/").get(getAllUser).post(createUser)

router.route('/:userId').get(getSingleUser).delete(deleteSingleUser).put(updateUser)

router.route('/:userId/friends/:friendId').post(addSingleFriend).delete(removeFriend)

module.exports = router;
