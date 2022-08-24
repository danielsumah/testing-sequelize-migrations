const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('databse', 'root', 'password', {
    dialect: 'mysql',
    dialectOptions: {
      // Your mysql2 options here
        "host": "127.0.0.1",
    }
});

module.exports = sequelize;