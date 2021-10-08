const express = require('express'); // On a besoin d'importer express pour créer le routeur
const router = express.Router(); // Avec cette méthode on va enregistrer les routes sur le retour pour les utiliser dans d'autres fichiers
const sauceCtrl = require('../controllers/sauce'); // On export le contrôle ici puisque la logique est contenu dans ce fichier

// On retire le chemin de base pour l'importer de manière plus intuitive dans notre app sur tout les chemins
router.post('/', sauceCtrl.createSauce); // on importe notre fonction du controller directement dans notre route 

// Ici les ':' précise une partie dynamique qui évoluera en fonction de l'ID cliqué

router.post('/', sauceCtrl.createSauce);
router.get('/:id', sauceCtrl.getOneSauce); 
router.get('/', sauceCtrl.getAllSauces);
router.put('/:id', sauceCtrl.modifySauces);
router.delete('/:id', sauceCtrl.deleteSauces);
router.post('/:id/like', sauceCtrl.likeOrDislikesSauce);

module.exports = router; // On exporte le routeur de ce fichier