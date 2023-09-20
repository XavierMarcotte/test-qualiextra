import Admin from "../models/Admin.js";

import jwt from 'jsonwebtoken';
const adminController = {

    async login(req, res) {
        const { mailLog, passwordLog } = req.body;
        const lowercaseMail = mailLog.toLowerCase();
        try {
            const admin = await Admin.findOne({ where: { mail: lowercaseMail, password: passwordLog, } });

            if (!admin) {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }

            if (admin) {
                const token = jwt.sign({ id: admin.id, mail: admin.mail, role: admin.role }, '6D3R#2aerp4g&d8%q37JAob%F&75', { expiresIn: '1h' });
                return res.json({ message: `Connexion réussie, bienvenue ${admin.role}`, token });
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ message: 'Erreur lors de la connexion.' });
        }
    },
}

export default adminController;