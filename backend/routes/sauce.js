const express = require('express'); // Récupération du module 'express' pour utiliser ces méthodes de routes
const router = express.Router(); // Création des routes http grâce à la méthode 'Router' du module 'express'
const sauceCtrl = require('../controllers/sauce'); // Importation des controllers qui précise l'action à effectuer à l'appel de cette route
const auth = require("../middleware/auth"); // Importation du middleware 'auth' qui permet de vérifier si l'utilisateur est habilité à effectuer des opérations
const multer = require('../middleware/multer-config'); // Importation de l'objet multer pour la prise en compte de fichiers utilisateur

// Retrait du chemin de base pour l'importer de manière non répétitive dans notre app sur tout les chemins en une seule fois
  
router.get('/', auth, sauceCtrl.getAllSauces);// Importation des 'controllers' directement dans notre route
router.get('/:id', auth, sauceCtrl.getOneSauce); // Les ':' précise une partie dynamique qui évoluera en fonction de l'ID cliqué
router.post('/', auth,  multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauces);
router.delete('/:id', auth, sauceCtrl.deleteSauces);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikesSauce);

module.exports = router; // Exportation des routes pour les appliquer dans l'app