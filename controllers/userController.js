const { User, Thought } = require('../models');

module.exports = {
    //get users
    async getUser(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },


    // get one user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate({ path: 'tags', select: '-__v' });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.body.postId },
                { $addToSet: { tags: tag._id } },
                { new: true }
            );
        }
    },


    // update a user
    async updateUser(req, res) {
                try {
                    const user = await User.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $set: req.body },
                        { new: true }
                    );

                    if (!user) {
                        return res
                            .status(404)
                            .json({ message: "No user with that ID" });
                    }
                    res.json("User updated");
                } catch (err) {
                    res.status(500).json(err);
                };
            },


    // delete a user
    async deleteUser(req, res) {
                try {
                    const user = await User.findByIdAndRemove(req.params.userId);

                    if (!user) {
                        return res.status(404).json({ message: "That user does not exist" });
                    }

                    const thought = await Thought.deleteMany({
                        username: user.username,
                    });

                    res.json({ message: "User deleted" });
                } catch (err) {
                    res.status(500).json(err);
                }
            },


    // add friend
    async addFriend(req, res) {
                try {
                    const user = await User.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $addToSet: { friends: req.body } },
                        { new: true }
                    );

                    if (!user) {
                        return res
                            .status(404)
                            .json({ message: "No user found with that ID" });
                    }

                    res.json(user);
                } catch (err) {
                    res.status(500).json(err);
                }
            },


    // remove friend
    async removeFriend(req, res) {
                try {
                    const user = await User.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $pull: { friends: req.params.friendId } },
                        { new: true }
                    );

                    if (!user) {
                        return res.status(404).json({ message: "No user found with that ID" });
                    }

                    res.json({ message: "Friend deleted" });
                } catch (err) {
                    res.status(500).json(err);
                }
            }
        }