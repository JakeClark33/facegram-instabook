const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
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

module.exports = router;
