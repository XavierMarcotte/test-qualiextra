import Reservation from "../models/Reservation.js";
import Service from "../models/Service.js";
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config()

const gmailPass = process.env.GMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'qualiextra2@gmail.com',
        pass: gmailPass,
    }
});


const reservationController = {

    async addReservation(req, res) {
        try {
            const { user, userId, cartPrice, carts, service } = req.body;
            for (const cart of carts) {
                const { date, resServiceId, establishmentId, tookPlace, extra } = cart;
                const reservation = await Reservation.create({
                    user,
                    service,
                    date,
                    cartPrice,
                    userId,
                    resServiceId,
                    establishmentId,
                    tookPlace,
                    extra,
                });
                const mailOptionsClient = {
                    from: "QualiExtra",
                    to: user.mail,
                    subject: 'Confirmation de réservation',
                    html: `<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">

                    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <p style="text-align: center;"><img src="https://cdn.discordapp.com/attachments/636490983734902794/1139518698575642774/logo_QE.png"></p>
                        <h2>Bonjour Mme/M.${user.lastname}</h2>
                        </br>
                        <p style="font-weight: bold; text-align: center; font-size: 1.3em;">Votre réservation a bien été prise en compte</p>
                        </br>
                        <p>Voici un petit récapitulatif de votre commande :</p>
                        <p style= "font-weight: bold;">Total du prix de la commande : <span style="font-weight: normal;">${cartPrice}€</span></p>
                        <p style= "font-weight: bold;">Service reservé(s):</p>
                        ${carts.map(cart => {
                            return `<p>- ${cart.service.name}, le ${cart.date.slice(0,10)}</p>`
                        }).join('')}
                        <p>Cordialement,</p>
                        <p style="font-weight: Bold; font-size: 1.2em; color: #001313;">QualiExtra</p>
                    </div>
                    
                    </body>`
                };

                transporter.sendMail(mailOptionsClient, (error, info) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Email envoyé: ' + info.response);
                    }
                });

            }
    
            return res.status(201).json({ message: 'Réservations ajoutées avec succès' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async getInfos(req, res) {
        const userId = req.params.userId
        try {
            const reservation = await Reservation.findAll({
                where: { userId },
                include: [{
                    model: Service, as: 'resService'
                }]
            });

            if (!reservation) {
                return res.status(404).send({ error: 'Pas de reservation trouvée' });
            }

            res.json(reservation);
        } catch (error) {
            res.status(500).send({ error: 'Erreur lors de la récupération de la reservation' });
        }
    },

    async getReservationsPresta (req, res) {
        const userId = req.params.userId
        try {
            const reservation = await Reservation.findAll({
                where: { userId },
                include: [{
                    model: Service, as: 'resService'
                }]
            });
            if (!reservation) {
                return res.status(404).send({ error: 'Pas de reservation trouvée' });
            }
            res.json(reservation);
        } catch (error) {
            res.status(500).send({ error: 'Erreur lors de la récupération de la reservation' });
        }
    },

    async deleteReservation(req, res){
        const reservationId = req.params.reservationId;

        try{
            const deletedReservation = await Reservation.destroy({ where: {id: cartId }});

            if (deletedReservation === 1){
                return res.status(200).json({ message: `✓ Reservation supprimée avec succès.` });
            } else {
                return res.status(404).json({ message: "Reservation non trouvée"})
                } 
            } catch (error) {
                console.error(`Erreur lors de la suppression du service :`, error)
        }
    }
};

export default reservationController;