import sequelize from '../database.js';
import Admin from './Admin.js';
import Etablissement from './Etablissement.js';
import Service from './Service.js';
import Users from './Users.js';
import Cart from './Cart.js';
import Reservation from './Reservation.js';

Etablissement.hasMany(Service, { foreignKey: 'etablissementId', as: 'services' });
Service.belongsTo(Etablissement, { foreignKey: 'etablissementId', as: 'etablissement' });

Service.hasMany(Cart, { foreignKey: 'serviceId', as: 'cart' });
Cart.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

Service.hasMany(Reservation, { foreignKey: 'resServiceId', as: 'reservation'})
Reservation.belongsTo(Service, { foreignKey: 'resServiceId', as: 'resService' });
export { sequelize, Admin, Etablissement, Service, Users, Cart, Reservation };