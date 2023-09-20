import { Model, DataTypes } from 'sequelize';
import sequelize from "../database.js";

class Cart extends Model{}

Cart.init({
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
    serviceId: {
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

}, {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart'
});



export default Cart;