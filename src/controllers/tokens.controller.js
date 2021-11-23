const tokens = require("../models/tokens.model.js");
const users = require("../models/users.model.js");
const md5 = require("md5");
const config = require("../config.js");

const generateToken = function(userName) {
    const token = userName + '-' + md5(Date.now()+config.token_key);
    return token;
}

// Get Tokens
const getTokens = async function(request, response) {
    let params = {};
    if(request.params.user_id)
        params.user_id = request.params.user_id;
    const tokensResult = await tokens.getTokens(params);
    response.status(200).send(tokensResult);
}

// Add Token
const addToken = async function(request, response) {
    if(!request.body) 
        return response.sendStatus(400).send({'Not added': 'Empty request body'}); 
    const userId = request.body.user_id;
    const user = await users.getUser(userId);
    if(!user) 
        return response.sendStatus(400).send({'Not added': 'Not isset user'});
    const tokenData = {
        'user_id': user._id,
        'value': generateToken(user.name)
    };
    try {
        const token = await tokens.addToken(tokenData);
        response.status(200).send({
            'Status': token.errors?'Error':'Token added',  
            'Data': token
        });
    } 
    catch (e) {
        return response.status(400).send({'Error': e.message});
    }
}

// Update Token
const updateToken = async function(request, response) {
    if(!request.body) 
        return response.sendStatus(400).send({'Not updated': 'Empty request body'});  
    const tokenId = request.body.id;
    if(!tokenId) 
        return response.status(400).send({'Not updated': 'Empty Token ID'});
    const token = await tokens.getToken({'_id': tokenId});
    if(!token) 
        return response.status(400).send({'Not updated': 'Not isset Token'});
    const user = await users.getUser(token.user_id);
    if(!user) 
        return response.status(400).send({'Not updated': 'Not isset User'});
    const tokenData = {
        'value': generateToken(user.name)
    };
    try {
        const token_upd = await tokens.updateToken(tokenId, tokenData);
        response.status(200).send({
            'Status': 'Token updated',  
            'Data': token_upd
        });
    } 
    catch (e) {
        return response.status(400).send({'Error': e.message});
    }
}

// Delete Token
const deleteToken = async function(request, response) {  
    const tokenId = request.params.id;
    if(!tokenId) 
        return response.status(400).send({'Not deleted': 'Empty Token ID'});
    try {
        const token = await tokens.deleteToken(tokenId);
        response.status(200).send({
            'Status': 'Token deleted',  
            'Data': token
        });
    } 
    catch (e) {
        return response.status(400).send({'Error': e.message});
    }
}



module.exports = {
    getTokens,
    addToken,
    updateToken,
    deleteToken
};