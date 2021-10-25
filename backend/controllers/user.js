const User = require('../models/User'); // Importation des models 'User' puisque les controllers gérent les requêtes et les réponse
const bcrypt = require('bcrypt'); // Permet de créer des hash des mots de passe
const jwt = require('jsonwebtoken'); // Permet d'encoder un 'token' pour vérifier que l'utilisteur peut manipuler ces informations
// MiddleWare d'enregistrement d'un utilisateur 

exports.signup = (req, res, next) => {
    // On initialise directement le bcrypt car celui-ci prend du temps

    bcrypt.hash(req.body.password, 10) // Récupération du password du corps de la requête et où le hash s'effectuera 10 fois
        .then(hash => {
            const user = new User({
                email: req.body.email, // Récupération de l'adresse email de la requête reçue
                password: hash // Récupération du hash du mot de passe
            });
            user.save() // Enregistre l'utilisateur dans la base de données
            .then(()=> res.status(201).json({message: 'Utilisateur créé'}))
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

// MiddleWare de connexion d'un utilisateur 

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Cherche un seul utilisateur
        .then(user => {
            if(!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé'});
            } else {
                bcrypt.compare(req.body.password, user.password) // Comparaison du hash envoyé avec le hash stocké dans le BDD
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId : user.id,
                        token:jwt.sign(
                            { userId: user._id }, // Vérification que les requêtes correspondent bien au user.id
                            process.env.TOKEN, // Clé secrète de l'encodage
                            { expiresIn: '24h' } // Le token expire au bout de 24h
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
            }
        })
        .catch(error => res.status(500).json({error}));
};