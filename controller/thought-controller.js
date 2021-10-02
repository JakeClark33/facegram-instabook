
const { Thought, User } = require('../models');

const thoughtController = {
    // add thought to User
        addThought({ params, body }, res) {
            console.log(body);
            Thought.create(body)
              .then(({ _id }) => {
                return User.findOneAndUpdate(
                  { _id: params.userId },
                  { $push: { thoughts: _id } },
                  { new: true }
                );
              })
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
          },
    //remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      }
};

module.exports = thoughtController;


// module.exports = {
//     findAll: function(req, res) {
//       db.Login
//         .find(req.query)
//         .sort({ date: -1 })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },
//     findById: function(req, res) {
//       db.Login
//         .findById(req.params.id)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },
//     create: function(req, res) {
//       db.Login
//         .create(req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },
//     update: function(req, res) {
//       db.Login
//         .findOneAndUpdate({ _id: req.params.id },
//           {$set: {
//             cleaning: req.body.cleaning
//           }})
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     },
//     remove: function(req, res) {
//       db.Login
//         .findById({ _id: req.params.id })
//         .then(dbModel => dbModel.remove())
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
//     }
//   };

