
module.exports = function (sequelize, DataTypes) {
    var Questions = sequelize.define("Questions", {
        questions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answers: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Questions;
};