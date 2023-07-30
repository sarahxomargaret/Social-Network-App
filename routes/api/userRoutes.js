const router = require("express").Router();
const {
    getUser,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController')