
module.exports = function (sequelize, DataTypes) {
    var Scores = sequelize.define("Scores", {
        daily: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        weekly: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return Scores;
};