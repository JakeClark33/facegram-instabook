const mongoose = require('mongoose');
const { User } = require('../models/User');

const userController = {
    // get all the Users
    getAllUsers(req, res) {
        User.find({})
        // .populate({
        //   path: ['thoughts', 'friends'],
        //   select: '-__v'
        // })
        .then(dbUserData => res.json(dbUserData))
    },
   // get one user by id
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      // .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
    //functions will go in this method
    //create User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
        },
    //update user by ID
    updateUser({ params, body }, res)  {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete user
    deleteUser({ params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add user friends
    addUserFriend({ body, params }, res) {
      // return res.json({message: "Add friend route"})
      User.findOne({ _id: params.userId })
      .then(dbUserData => {
        const friends = dbUserData.friends;
        const isFriend = friends.indexOf(body.friendUserId) !== -1;
        if(isFriend){
          return res.json({message: "User is already a friend!"});
        } else {
          // Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
          friends.push(body.friendUserId);
        User.findOneAndUpdate({ _id: params.userId },{ friends }, { new: true })
        .then(dbUserData2 => res.json(dbUserData2))
          .catch(err => res.status(400).json(err));
        }
        // return res.json(isFriend)
      })
      .catch(err => res.status(400).json(err));
      // User.create(body)
      // .then(dbData => res.json(dbUserData))
      // .catch(err => res.status(400).json(err));
      },

   // Delete user friends
   deleteUserFriend({ body, params }, res) {
    User.findOne({ _id: params.userId })
    .then(dbUserData => {
      const friends = dbUserData.friends;
      const friendIndex = friends.indexOf(body.friendUserId)
      const isFriend = friendIndex !== -1;
      if(isFriend){
        friends.splice(friendIndex, 1);
        User.findOneAndUpdate({ _id: params.userId },{ friends }, { new: true })
          .then(dbUserData2 => res.json(dbUserData2))
          .catch(err => res.status(400).json(err));
      } else {
        return res.json({message: "User is already a friend!"});
      }
    })
    .catch(err => res.status(400).json(err));
    // User.create(body)
    // .then(dbData => res.json(dbUserData))
    // .catch(err => res.status(400).json(err));
    },
  }

module.exports = userController;
