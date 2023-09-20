import { Etablissement, Service } from "../models/initModels.js";

const etablissementController = {

    async list(req, res) {
        try {
            const etablissements = await Etablissement.findAll();
            res.json(etablissements);
        } catch (error) {
            console.error(error);
            res.status(500).json('error');
        }
    },


    async addEtablissement(req, res) {
        try {
            const { name, address, phone, image } = req.body;
            const etablissement = await Etablissement.create({ name, address, phone, image});
            res.status(201).json(etablissement);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    async etablishID(req, res){
        const etablishId = req.params.id;
        try{
            const etablish = await Etablissement.findOne({
                include: [{ model: Service, as: 'services' }],
                where: { id: etablishId }});
            
            if (etablish){
                res.json(etablish);
            } else {
                res.status(404).json({ error: `Etablissement non trouvé`});
            }
        } catch (error){
            console.error("erreur detail:", error);
            res.status(500).json({ error: `Une erreur s'est produite lors de la récupération de l'établissement` });
        }
    }

}
    export default etablissementController;