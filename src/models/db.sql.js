const Sequelize = require('sequelize');


const db_config = {
    host: process.env.MYSQL_HOST || 'localhost:3306',
    dbname: process.env.MYSQL_DBNAME || 'less',
    username: process.env.MYSQL_USERNAME || 'root',
    pass: process.env.MYSQL_PASS || '1234'
};



const connect = function () {
    try {
        const sequelize = new Sequelize(db_config.dbname, db_config.username, db_config.pass, {
            host: db_config.host,
            dialect: 'mysql'
        });
        
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    } 
    catch (e) {
        console.error(e);
    }
};

module.exports = { connect };
