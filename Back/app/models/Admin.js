import { Model, DataTypes } from 'sequelize';
import sequelize from "../database.js";

class Admin extends Model{}

Admin.init({
    mail: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail : true,
        },
    },
    role: {
        type: DataTypes.TEXT,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admin'
});

export default Admin;