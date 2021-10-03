const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addUserFriend,
    deleteUserFriend
} = require('../../controller/user-controller');

//Set up get all and post at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

// Set up Get one, Put, and Delete at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// Add/Remove Friends at /api/users/userId/friends
router
.route('/:userId/friends')
.put(addUserFriend);

router
.route('/:userId/friends/remove')
.put(deleteUserFriend);

module.exports = router;
