const mongoose = require("mongoose");

// Tokens Schema
const Schema = mongoose.Schema;
const tokensScheme = new Schema({
    id: Schema.ObjectId,
    user_id: {
        type: String,
        required : true
    },
    value: {
        type: String,
        required : true
    }
});
const tokens = mongoose.model("tokens", tokensScheme);



// Get Tokens
const getTokens = async function(params) {
    try {
        return await tokens.find(params);
    } 
    catch (e) {
        return e;
    }
};


// Get Token
const getToken = async function(params) {
    try {
        return await tokens.findOne(params);
    } 
    catch (e) {
        return e;
    }
};

// Add Token
const addToken = async function(token) {
    const newToken = new tokens(token);
    try {
        await newToken.save();
        return newToken;
    } 
    catch (e) {
        return e;
    }
}

// Update Token
const updateToken = async function(id, token) {
    try {
        await tokens.findByIdAndUpdate(id, token);
        return token;
    } 
    catch (e) {
        return e;
    }
}

// Delete Token
const deleteToken = async function(id) {
    try {
        return await tokens.findByIdAndRemove(id);
    } 
    catch (e) {
        return e;
    }
}



module.exports = {
    getTokens,
    getToken,
    addToken,
    updateToken,
    deleteToken
};
