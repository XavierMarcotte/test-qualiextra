import { Model, DataTypes } from 'sequelize';
import sequelize from "../database.js";

class Users extends Model{}

Users.init({
    mail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail : true,
        },
        set(value) {
            this.setDataValue('mail', value.toLowerCase());
        }
    },
    address: {
        type: DataTypes.TEXT,
    },
    role: {
        type: DataTypes.TEXT,
    },
    lastname: {
        type: DataTypes.TEXT,
    },
    firstname: {
        type: DataTypes.TEXT,
    },
    number: {
        type: DataTypes.TEXT,
    },
    password: {
        type: DataTypes.STRING,
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
    }
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users'
});

export default Users;