import express from 'express';
import multer from 'multer';
import etablissementController from './controllers/etablissementController.js';
import usersController from './controllers/usersController.js';
import adminController from './controllers/adminController.js';
import serviceController from './controllers/serviceController.js';
import cartController from './controllers/cartController.js';
import reservationController from './controllers/reservationController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/prestataire/etablissement', etablissementController.list);
router.get('/prestataire/etablissement/:id', etablissementController.etablishID);
router.post('/etablissement/post', etablissementController.addEtablissement);

router.post('/uploaded-image', upload.single('image'), (req, res) => {
    res.status(200).json({
        message: 'Image uploadée avec succès',
        url: '/uploads/' + req.file.filename
    });
});

router.get('/prestataire/service', serviceController.servicelist);
router.get('/prestataire/service/:id', serviceController.serviceID);
router.post('/prestataire/service/post', serviceController.addService);


router.get('/users/prestataire/:id', usersController.getInfos);
router.put('/users/prestataire/:id', usersController.updateInfosPresta);

router.get('/search/services', serviceController.searchService)

router.get('/users', usersController.users);
router.get('/users/:id', usersController.getInfos);
router.put('/users/:id', usersController.updateInfos);
router.get('/users/checkmail/:email', usersController.checkEmail);
router.post('/users/post', usersController.register);
router.post('/users/login', usersController.login);
router.delete('/users/:userId', usersController.delete);

router.post('/admin/login', adminController.login);

router.post('/cart/:id', cartController.addCart)
router.get('/cart/:id', cartController.getInfos)
router.delete('/cart/:cartId', cartController.deleteCart)
router.delete('/cart/user/:userId', cartController.deleteAllCart)

router.get('/reservation/prestataire/:userId', reservationController.getReservationsPresta);
router.post('/reservation/:id', reservationController.addReservation)
router.get('/reservation/:userId', reservationController.getInfos)
router.delete('/reservation/:resId', reservationController.deleteReservation)

export default router;