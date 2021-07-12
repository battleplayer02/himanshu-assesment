module.exports = (sequelize, Sequelize) => {
    const alert = sequelize.define("alert", {
        email: {
            unique: true,
            type: Sequelize.STRING,
            allowNull: false,
        }, phone: {
            type: Sequelize.BIGINT,
            allowNull: false,
        }, criteria: {
            type: Sequelize.STRING,
            allowNull: false,
        }, values: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }, day: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
    return alert;
};