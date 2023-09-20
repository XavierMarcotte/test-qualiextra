import Cart from "../models/Cart.js";
import Service from "../models/Service.js";

const cartController = {

    async addCart(req, res) {
        try {
            const { user, date, userId, serviceId, tookPlace, extra } = req.body;
            if(!user.confirmed){
                return res.status(401).send({ message: 'Vous devez valider votre adresse mail pour pouvoir réserver un service'});
            } else{
            const cart = await Cart.create({
                date, userId, serviceId, tookPlace, extra 
            });


                return res.status(201).json({ message: `Panier confirmé` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    async getInfos(req, res) {
        const urlID = req.params.id
        try {
            const cart = await Cart.findAll({
                include: [{ model: Service, as: 'service' }],
                where: { userId: urlID },
            });

            if (!cart) {
                return res.status(404).send({ error: 'Pas de reservation trouvée' });
            }

            res.json(cart);
        } catch (error) {
            res.status(500).send({ error: 'Erreur lors de la récupération de la reservation' });
        }
    },

    async deleteCart(req, res){
        const cartId = req.params.cartId;

        try{
            const deletedCart = await Cart.destroy({ where: {id: cartId }});

            if (deletedCart === 1){
                return res.status(200).json({ message: `✓ Utilisateur supprimé avec succès.` });
            } else {
                return res.status(404).json({ message: "Reservation non trouvée"})
                } 
            } catch (error) {
                console.error(`Erreur lors de la suppression du service :`, error)
        }
    },

    async deleteAllCart(req, res){
        const userId = req.params.userId;

        try{
            await Cart.destroy({ where: {user_id: userId} });
            res.status(200).json({ message: `Panier de l'utilisateur supprimé avec succès` })
        } catch (error) {
            console.error(`Erreur lors de la suppression des paniers :`, error);
            res.status(500).json({ error: 'Erreur lors de la suppression du panier' });
        }
    }
};

export default cartController;