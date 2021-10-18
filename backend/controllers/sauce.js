// Les controllers prennent la logique métier de chaque route pour les importer de manière plus intuitives après dans les middleware

const Sauce = require('../models/Sauce'); // Importation des models 'Sauce' puisque les controllers gérent les requêtes et les réponse
const fs = require('fs'); // Package Node, 'file system' qui donne accès aux opérations du système fichier
const { findOne } = require('../models/Sauce');

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // Récupération de toutes les sauces
        .then(sauces => res.status(200).json(sauces)) // Si résolue, renvoie les sauces en JSON
        .catch(error => res.status(400).json(error));
};

exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({_id: req.params.id}) // Récupération d'un seul élément | Comparaison de l'id envoyé avec celui de la base de donnée
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json(error));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // Exctraction de l'objet JSON du corps de la requête
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject, // L'opérateur spread '...' permet de copier les champs du body de la request (qui est l'objet sauce) et détaillera les informations
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // 1: HTTP(S) 2: Racine du server 3:Le dossier 4:Le nom du fichier à intégrer 
    });
    sauce.save()
        .then(() => res.status(201).json({message : 'Objet enregistré'}))
        .catch(error => res.status(400).json(error));
};

exports.modifySauces = (req, res, next) => {
    const sauceObject = req.file ? // Opérateur ternaire pour vérifier si l'image existe ou non
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Si il existe on récupère l'image et on la modifie,
    } : { ...req.body }; // Si il n'existe pas copie du req.body
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id}) // On récupère l'identifiant pour correspondre à celui de la requête
    .then(() => res.status(200).json({message : "Sauce Modifiée"}))
    .catch(error => res.status(403).json(error));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}) // Recherche de l'id se trouvant dans les paramètres de la requête
        .then(sauce => { // L'objectif est de récupérer le nom précis du fichier
            const filename = sauce.imageUrl.split('/images/')[1] // Le tableau récupérera tout ce qui vient avant images et après images
            fs.unlink(`images/${filename}`, () => { // Appel de la fonction de supression d'un fichier grâce au package fs
                    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce Supprimée"}))
        .catch(error => res.status(400).json(error));
            }) 
        })
        .catch((error => res.status(500).json(error)));
};

exports.likeOrDislikesSauce = (req, res, next) => {
    if(req.body.like === 1) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {likes : +1}, $push : {usersLiked : req.body.userId}})
            .then(() => res.status(200).json({message: "Sauce likée"}))
            .catch(error => res.status(400).json(error));

     } else if(req.body.like === -1) {
        Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes : +1}, $push : {usersDisliked : req.body.userId}})
            .then(() => res.status(200).json({message: "Sauce dislikée"}))
            .catch(error => res.status(400).json(error));

     } else if(req.body.like === 0) {
        Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                if(sauce.usersLiked.includes(req.body.userId) == true){
                    Sauce.updateOne({_id: req.params.id}, {$inc: {likes : -1}, $pull : {usersLiked : req.body.userId}})
                    .then(() => res.status(200).json({message: "Sauce non votée"}))
                    .catch(error => res.status(400).json(error));
                
                } else if (sauce.usersDisliked.includes(req.body.userId) == true) {
                    Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes : -1}, $pull : {usersDisliked : req.body.userId}})
                    .then(() => res.status(200).json({message: "Sauce non votée"}))
                    .catch(error => res.status(400).json(error));
                }
            })
            .catch(error => res.status(400).json(error));
     }
};