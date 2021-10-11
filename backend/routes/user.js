const express = require("express"); // Récupération du module 'express' pour utiliser ces méthodes routes
const router = express.Router(); // Création des routes http grâce à la méthode 'Router' du module 'express'
const userCtrl = require('../controllers/user'); // Importation des controllers qui précise l'action à effectuer à l'appel de cette route

// Post('le frontend envoie une info) + route + action à effectuer contenu dans le controller
router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login); 

module.exports = router; // Exportation des routes pour les appliquer à l'app