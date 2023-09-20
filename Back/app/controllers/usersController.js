import Users from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

function generateRandomString(length) {
    const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&-_=+?`;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

const usersController = {

    async users(req, res) {
        try {
            const user = await Users.findAll();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json('error');
        }
    },

    async register(req, res) {
        try {
            const { mail, firstname, lastname, address, number, role, password, isConfirmed } = req.body;

            if (role === 'client'){
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const user = await Users.create({ mail, firstname, lastname, address, number, role, password: hashedPassword, isConfirmed });
                const mailOptionsClient = {
                    from: "QualiExtra",
                    to: mail,
                    subject: 'Confirmation de création de compte',
                    html: `<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">

                    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <p style="text-align: center;"><img src="https://cdn.discordapp.com/attachments/636490983734902794/1139518698575642774/logo_QE.png"></p>
                        <h2>Bonjour Mme/M.${user.lastname}</h2>
                        <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse e-mail:</p>
                        <p style="text-align: center;">
                            <a href="http://localhost:1234/confirmation_de_compte" style="background-color: #001313; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Confirmez votre e-mail</a>
                        </p>
                        <p>Si vous n'avez pas demandé cette inscription, veuillez ignorer cet e-mail.</p>
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

            } else if(role === "prestataire"){
                const user = await Users.create({ mail, firstname, lastname, address, number, role, password: generateRandomString(12), isConfirmed: true });
            const mailOptionsPresta = {
                from: "QualiExtra",
                to: mail,
                subject: 'Compte prestataire créé',
                html: `<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">

                <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <p style="text-align: center;"><img src="https://cdn.discordapp.com/attachments/636490983734902794/1139518698575642774/logo_QE.png"></p>
                    <h2>Bonjour Mme/M.${user.lastname} ${user.firstname}</h2>
                    <p>Bonne nouvelle ! Votre compte prestataire à été créé.</p>
                    <p style="font-weight: bold;">Adresse Mail de connexion : ${user.mail}</p>
                    <p style="font-weight: bold;">Mot de passe temporaire : </p>
                    <p style="font-size: 2.2em; background-color: #fcf6bd; text-align: center; margin: 0 10rem;">${user.password}</p>
                    <p>Pensez à changer votre mot de passe rapidement.</p>
                    <p>Si vous voulez le changer dès maintenant connectez vous et allez dans vos informations de compte</p>
                    <p style="text-align: center; margin: 3rem;">
                        <a href="http://localhost:1234/auth" style="background-color: #001313; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Connectez vous</a>
                    </p>
                    <p>Si vous n'avez pas demandé cette inscription, veuillez ignorer cet e-mail.</p>
                    <p>Cordialement,</p>
                    <p style="font-weight: Bold; font-size: 1.2em; color: #001313;">QualiExtra</p>
                </div>
                
                </body>`
            };
            transporter.sendMail(mailOptionsPresta, (error, info) => {
                if(error){
                    console.error(error);
                } else {
                    console.log('Email envoyé :' + info.response);
                }
            });

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.update({password: hashedPassword});
        };

            return res.status(201).json({ message: `✓ Nouvel utilisateur créé`, newUser: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' })
        }
    },

    async login(req, res) {
        const { mailLog, passwordLog } = req.body;
        const lowercaseMail = mailLog.toLowerCase();

        try {
            const user = await Users.findOne({ where: { mail: lowercaseMail } });

            if (!user) {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }

            const validPass = await bcrypt.compare(passwordLog, user.password);
            if (!validPass) {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }
            if (user && validPass) {

                const token = jwt.sign({ id: user.id, mail: user.mail, role: user.role, firstname: user.firstname, lastname: user.lastname, address: user.address, number: user.number, confirmed: user.isConfirmed }, '6D3R#2aerp4g&d8%q37JAob%F&75', { expiresIn: '1h' });

                return res.json({ message: `Connexion réussie, bienvenue ${user.lastname}`, token });
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ message: 'Erreur lors de la connexion.' });
        }
    },


    async getInfos(req, res) {
    try {
        const user = await Users.findByPk(req.params.id);

        if (!user) {
            return res.status(404).send({ error: `Pas d'utilisateur trouvé` });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ error: `Une erreur est survenue lors de la récuperation de l'utilisateur` });
    }
},

    async updateInfos(req, res) {
        const { firstname, lastname, confirmed } = req.body;
    
        try {

            const user = await Users.findByPk(req.params.id);
    
            if (!user) {
                return res.status(404).send({ error: `Pas d'utilisateur trouvé` });
            }
    
            await user.update({
                firstname,
                lastname,
                isConfirmed: confirmed,
            });

            const updatedUser = await Users.findByPk(req.params.id);

            const token = jwt.sign({ 
                id: updatedUser.id, 
                mail: updatedUser.mail, 
                role: updatedUser.role, 
                firstname: updatedUser.firstname, 
                lastname: updatedUser.lastname,
                confirmed: updatedUser.isConfirmed, 
            }, '6D3R#2aerp4g&d8%q37JAob%F&75', { expiresIn: '1h' });

            res.send({ user: updatedUser, token });

        } catch (error) {
            res.status(500).send({ error: `Une erreur est survenue lors de la mise à jour de l'utilisateur` });
        }
    },

    async updateInfosPresta(req, res) {
        const { firstname, lastname, address, number, password } = req.body;
        try {
            const user = await Users.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({ error: `Pas d'utilisateur trouvé` });
            }
            const saltRounds = 10;
            const hashedPass = await bcrypt.hash(password, saltRounds);
            user.update({password: hashedPass})
            await user.update({
                firstname,
                lastname,
                address,
                number,
                hashedPass,
            });
            const updatedUser = await Users.findByPk(req.params.id);

            const token = jwt.sign({ 
                id: updatedUser.id, 
                mail: updatedUser.mail, 
                role: updatedUser.role, 
                firstname: updatedUser.firstname, 
                lastname: updatedUser.lastname,
                address: updatedUser.address,
                number: updatedUser.number,
            }, '6D3R#2aerp4g&d8%q37JAob%F&75', { expiresIn: '1h' });

            res.send({ user: updatedUser, token});

        } catch (error) {
            res.status(500).send({ error: `Une erreur s'est produite lors de la mise à jour de l'utilisateur` });
        }
    },


    async delete(req, res) {
        const userId = req.params.userId;

        try {
            const deletedUser = await Users.destroy({ where: { id: userId } });

            if (deletedUser === 1) {
                return res.status(200).json({ message: `✓ Utilisateur supprimé avec succès.` });
            } else {
                return res.status(404).json({ message: `Utilisateur non trouvée` });
            }
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'utilisateur :`, error)
        }
    },

    async checkEmail(req, res) {
        const email = req.params.email;
        const lowercaseMail= email.toLowerCase();

        try {
            const user = await Users.findOne({ where: {mail: lowercaseMail } });
            if (user){
                return res.json({ emailExists: true });
            } else  {
                return res.json({ emailExists: false });
            }
        } catch(error){
            console.error(`Erreur lors de la vérification de l'email`, error);
            res.status(500).json({ message: `Erreur lors de la vérification de l'email` });
        }
    }
};

export default usersController;