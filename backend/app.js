// Il faut que notre server node serve cette application

const express = require('express'); // On récupère notre module express
const bodyParser = require('body-parser'); // Il transformera les données JSON en données Javascript utilisable
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce')

mongoose.connect('mongodb+srv://Josh:Azerty3@piiquante.nbcgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // On créé notre application express en appelant la méthode express

app.use((req, res, next) => { // le chemin s'appliquant pour toutes les routes s'appliquera à chaque requête
    res.setHeader('Access-Control-Allow-Origin', '*'); // On ajoute des header à notre réponse, origin qui peut accéder à notre API c'est tout le monde (*) 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // On autorise l'utilisation de certaines en-tête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // On autorise certaines méthodes
    next(); // On dit qu'il peut passer au middleware suivant
  });

app.use(bodyParser.json()); // On aura accès à cette modification du body sur toutes les routes au format js

app.use('/api/sauces', sauceRoutes); // Ici on dit que toutes les routes comprenne ce chemin de base et on applique les routes en fonction de la requête

module.exports = app; // On exporte notre application pour la réutiliser dans un autre fichier