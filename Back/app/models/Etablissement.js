import { Model, DataTypes } from 'sequelize';
import sequelize from "../database.js";

class Etablissement extends Model{}

Etablissement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    address: {
        type: DataTypes.TEXT,
    },
    phone: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Etablissement',
    tableName: 'etablissement'
});


export default Etablissement;