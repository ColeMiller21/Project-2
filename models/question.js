
module.exports = function (sequelize, DataTypes) {
    var Questions = sequelize.define("Questions", {
        questions: {
            type: DataTypes.STING,
            allowNull: false
        },
        answers: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Questions;
};