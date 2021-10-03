const { User } = require('../models/User');

const friendController = {
    addFriendToUser({ params }, res) {
        // req.paraams.friendId, userId
        User.findByIdAndUpdate({ _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'sometimes friends dont work out, theres been an error' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    removeFriendFromUser({ params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = friendController;