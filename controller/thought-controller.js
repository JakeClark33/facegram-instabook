
const { Thought } = require('../models/Thought');

const thoughtController = {

  // get all the thoughts
  allThoughts(req, res) {
    Thought.find({})
      // .populate({
      //   path: 'users',
      //   select: '-__v'
      // })
      .then(dbThoughtData => res.json(dbThoughtData))
  },

  // add thought to User
  addThought( req, res) {
    console.log('========== Part 1 ==================')
    console.log("body", req.body);
    console.log('params', req.params);
    Thought.create(req.body)
    .then(dbThoughtData => res.json(dbThoughtData))
      // .then(thought => {
      //   console.log('========= Part 2 ===================')
      //   console.log("body", req.body);
      //   console.log('params', req.params);
      //   console.log('thought', thought);
      //   console.log('thoughtId', thought._id);
      //   console.log('thgought added successfully');
      //   return User.findOneAndUpdate(
      //     // { id: req.params.userId },
      //     { _id: thought._id },
      //     { $push: { thoughts: thought._id } },
      //     { new: true }
      //   );
      // })
      // .then(dbUserData => {
      //   console.log('user.findone and update completed')
      //   if (!dbUserData) {
      //     console.log('no user found')
      //     res.status(404).json({ message: 'No User found with this id!' });
      //     return;
      //   }
      //   console.log(`new thought added`)
      //   res.json(dbUserData);
      // })
      .catch(err => res.json(err));
  },

  // get one user by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      // .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.reactionId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  //remove thought
  removeThought({ params, query }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: query.user },
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
  },

  //delete pizza
  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.id })
      .then(dbReactionData => {
        if (!dbReactionData) {
          res.status(404).json({ message: 'No Reaction found with this Id!' });
          return;
        }
        res.json(dbReactionData);
      })
      .catch(err => res.status(400).json(err));
  }
}

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

