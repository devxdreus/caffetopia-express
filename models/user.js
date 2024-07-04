/*eslint-disable no-unused-vars*/

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Order, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.ENUM('admin', 'member'),
            refresh_token: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            freezeTableName: true,
            paranoid: true,
        }
    );
    return User;
};
