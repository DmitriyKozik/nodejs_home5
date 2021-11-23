const mongoose = require("mongoose");

// Users Schema
const Schema = mongoose.Schema;
const userScheme = new Schema({
    id: Schema.ObjectId,
    name: String,
    permission: {
        type: String,
        defaultValue: "user"
    }
});
const users = mongoose.model("users", userScheme);

// Get All Users
const getUsers = async function() {
    try {
        return await users.find({});
    } 
    catch (e) {
        return e;
    }
};

// Get User
const getUser = async function(id) {
    try {
        return await users.findById(id);
    } 
    catch (e) {
        return e;
    }
};

// Add User
const addUser = async function(user) {
    const newUser = new users(user);
    try {
        await newUser.save();
        return newUser;
    } 
    catch (e) {
        return e;
    }
}

// Update User
const updateUser = async function(id, user) {
    try {
        await users.findByIdAndUpdate(id, user);
        return user;
    } 
    catch (e) {
        return e;
    }
}

// Delete User
const deleteUser = async function(id) {
    try {
        return await users.findByIdAndRemove(id);
    } 
    catch (e) {
        return e;
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};
