const { URL } = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            "require": true,
            "rejectUnauthorized": false
        }
    }
});
async function auth() {
    try {
        const a = await sequelize.authenticate()
        console.log("connected");
        await db.sequelize.sync({ force: false })
        console.log("sync done");
    } catch (error) {
        console.log(error);
    }
}


const db = {
    Sequelize,
    sequelize,
    login: require("./login.js")(sequelize, Sequelize),
    alert: require("./alerts.js")(sequelize, Sequelize),
};
auth();

module.exports = db;