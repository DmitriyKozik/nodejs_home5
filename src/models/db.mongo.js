const mongoose = require("mongoose");
const config = require("../config.js");

const connect = function () {
    try {
        if(config.db_config.user && config.db_config.pass)
            mongoose.connect(`mongodb://${config.db_config.user}:${config.db_config.pass}@${config.db_config.host}:${config.db_config.port}/${config.db_config.db}`,{ useMongoClient:true });
        else
            mongoose.connect(`mongodb://${config.db_config.host}:${config.db_config.port}/${config.db_config.db}`,{ useMongoClient:true });
    } 
    catch (e) {
        console.error(e);
    }
};

module.exports = { connect };