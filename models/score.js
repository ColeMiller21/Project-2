
module.exports = function (sequelize, DataTypes) {
    var Score = sequelize.define("Scores", {
        daily: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        weekly: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return Score;
};