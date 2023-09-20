import Service from "../models/Service.js";
import { Op } from "sequelize";

const serviceController = {

    async servicelist(req, res) {
        try {
            const service = await Service.findAll();
            res.json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json('error');
        }
    },


    async addService(req, res) {
        try {
            const { name, price, description, guest, extras, startDate, endDate, image, etablissementId, limit, durationUnit, durationNumber, tags } = req.body;
            const service = await Service.create({ name, price, description, guest, extras, startDate, endDate, image, etablissementId, limit, durationUnit, durationNumber, tags });
            res.status(201).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    async serviceID(req, res){
        const serviceId = req.params.id;
        try{
            const service = await Service.findOne({ where: {id: serviceId }});
            
            if (service){
                res.json(service);
            } else {
                res.status(404).json({ error: `Service non trouvé`});
            }
        } catch (error){
            console.error(error);
            res.status(500).json({ error: `Une erreur s'est produite lors de la récupération du service` });
        }
    },

    async searchService(req, res) {
        const { arrivalDate, departureDate, keyword, participantCount } = req.query;
        const whereConditions = {};
    
        if (arrivalDate) {
            whereConditions.startDate = {
                [Op.gte]: arrivalDate,
            };
        }
        if (departureDate) {
            whereConditions.endDate = {
                [Op.lte]: departureDate,
            };
        }
        if (keyword) {
            whereConditions[Op.or] = [
                { title: { [Op.iLike]: `%${keyword}%` } },
                { description: { [Op.iLike]: `%${keyword}%` } },
            ];
        }
        if (participantCount) {
            whereConditions.limit = {
                [Op.gte]: participantCount,
            };
        }
        if (tags) {
            whereConditions.tags = {
                [Op.overlap]: tags.split(','),
            };
        }
    
        try {
            const services = await Service.findAll({
                where: whereConditions,
            });
            res.json(services);
        } catch (error) {
            console.error('Erreur lors de la récupération du service', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
    

}
    export default serviceController;