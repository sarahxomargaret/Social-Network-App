const { Thought, User } = require('../models');

module.exports = {
    //get thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            res.status(500).json(err);
        }
    },


    // get one thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate({ path: 'tags', select: '-__v' });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userID },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with that ID, thought created" });
            }
            res.json("Thought created");
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with that ID" });
            }
            res.json("Thought updated");
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({
                _id: req.params.thoughtId,
            });

            if (!thought) {
                return res.status(404).json({ message: "That thought does not exist" });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            res.json({ message: "Thought deleted" });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: "No thought found with that ID" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID" });
            }

            res.json({ message: "Reaction deleted" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};