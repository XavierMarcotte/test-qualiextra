import { Model, DataTypes } from 'sequelize';
import sequelize from "../database.js";

class Service extends Model{}

Service.init({
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
    price: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
    guest: {
        type: DataTypes.TEXT,
    },
    durationUnit: {
        type: DataTypes.TEXT,
    },
    durationNumber: {
        type: DataTypes.INTEGER,
    },
    extras: {
        type: DataTypes.JSONB,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
    },
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
    limit: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    },
    etablissementId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'etablissement',
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'Service',
    tableName: 'service'
});



export default Service;