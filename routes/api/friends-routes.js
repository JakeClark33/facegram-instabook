const router = require('express').Router();
const {
    addFriendToUser, 
    removeFriendFromUser
} = require('../../controller/friends-controller');
//base subroute
// api/friends/:userId
// get all friends for user
router
.route('/:friendId/:userId')
.post(addFriendToUser)

//delete friend from user 
router 
.route("/:id")
.delete(removeFriendFromUser)

module.exports = router;
// :friendId/:userId
// post
// go to addFriendToUser button