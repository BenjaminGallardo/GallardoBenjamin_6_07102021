// Il faut que notre serveur 'node' serve cette application

const express = require('express'); // Récupération du module express
const bodyParser = require('body-parser'); // Transformera les données JSON des body en données Javascript utilisables
const mongoose = require('mongoose'); // Mongoose créé un schéma pour modéliser vos données d’application
const path = require('path'); // Donne accès au chemin du système de fichier

const sauceRoutes = require('./routes/sauce'); // Récupération des routes 'sauces' pour appliquer le chemin universel à toutes les routes une seule fois
const userRoutes = require('./routes/user'); // Récupération des routes 'user' pour appliquer le chemin universel à toutes les routes une seule fois

// Connexion à mongoDB
mongoose.connect('mongodb+srv://Josh:Azerty3@piiquante.nbcgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // Création de l'application express en appelant la méthode express ( Prend en charge les sessions, le traitement des erreurs et le routage)

// 'app.use' est une fonction qui appelée à chaque requête

app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); // Ajout de headers à notre réponse | Précision de l'origin des utilisateurs pouvant accéder à l'API = Tout le monde 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorisation à l'utilisation de certaines en-tête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autorisation des méthodes listées
    next(); // Next précise que l'on passe au middleware suivant
  });

app.use(bodyParser.json()); // Conversion du body en JS sur toutes les routes

app.use('/images', express.static(path.join(__dirname, 'images'))); // Traitement des requêtes liés à l'image | L'app doit servir le dossier images

app.use('/api/sauces', sauceRoutes); // Chaque routes 'sauces' commencera obligatoirement par ce chemin
app.use('/api/auth', userRoutes); // Chaque routes 'auth' commencera obligatoirement par ce chemin

module.exports = app; // On exporte notre application pour la réutiliser dans le fichier 'server'