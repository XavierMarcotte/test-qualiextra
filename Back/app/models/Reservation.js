import { Model, DataTypes } from 'sequelize';
import sequelize from "../database.js";

class Reservation extends Model{}

Reservation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    resServiceId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'service',
            key: 'id'
        }
    },
    tookPlace: {
        type: DataTypes.INTEGER,
    },
    extra: {
        type: DataTypes.JSONB,
    },
    cartPrice: {
        type: DataTypes.INTEGER,
    }

}, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'reservation'
});



export default Reservation;