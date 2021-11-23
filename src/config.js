// Mongo DB
const db_config = {
    // host: process.env.MONGO_HOST || 'localhost',
    // port: process.env.MONGO_PORT || 27017,
    // db: process.env.MONGO_DBNAME || 'database1'

    host: process.env.MONGO_HOST || '@yaroslav@smoothr.de',
    port: process.env.MONGO_PORT || 3000,
    db: process.env.MONGO_DBNAME || 'testDb',
    user: process.env.MONGO_DBUSER || 'test',
    pass: process.env.MONGO_DBPASS || 'test'
};

// Token Key
const token_key = 'randomkey123';


module.exports = {
    db_config,
    token_key
};