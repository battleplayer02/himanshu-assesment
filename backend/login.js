module.exports = (sequelize, Sequelize) => {
    const login = sequelize.define("login", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: false
    });
    return login;
};