const users = require("../models/users.model.js");

// Get Users
const getUsers = async function(request, response) {
    const allUsers = await users.getUsers();
    response.status(200).send(allUsers);
}

// Add User
const addUser = async function(request, response) {
    if(!request.body) 
        return response.sendStatus(400).send({'Not added': 'Empty request body'});   
    const userData = {
        'name': request.body.name,
        'permission': request.body.permission || 'user'
    };
    if(!userData.name) 
        return response.status(400).send({'Not added': 'Empty User name'});
    try {
        const user = await users.addUser(userData);
        response.status(200).send({  
            'Status': user.errors?'Error':'User added', 
            'Data': user
        });
    } 
    catch (e) {
        return response.status(400).send({'Error': e.message});
    }
}

// Update User
const updateUser = async function(request, response) {
    if(!request.body) 
        return response.sendStatus(400).send({'Not updated': 'Empty request body'});  
    const userId = request.body.id;
    const userData = {
        'name': request.body.name,
        'permission': request.body.permission || 'user'
    };
    if(!userId) 
        return response.status(400).send({'Not updated': 'Empty User ID'});
    try {
        const user = await users.updateUser(userId, userData);
        response.status(200).send({
            'Status': user.errors?'Error':'User updated',  
            'Data': user
        });
    } 
    catch (e) {
        return response.status(400).send({'Error': e.message});
    }
}


// Delete User
const deleteUser = async function(request, response) {  
    const userId = request.params.id;
    if(!userId) 
        return response.status(400).send({'Not deleted': 'Empty User id'});
    try {
        const user = await users.deleteUser(userId);
        response.status(200).send({
            'Status': 'User deleted',  
            'Data': user
        });
    } 
    catch (e) {
        return response.status(400).send({'Error': e.message});
    }
}


module.exports = {
    getUsers, 
    addUser,
    updateUser,
    deleteUser
};