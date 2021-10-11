// Les controllers prennent la logique métier de chaque route pour les importer de manière plus intuitives après dans les middleware

const Sauce = require('../models/Sauce'); // Importation des models 'Sauce' puisque les controllers gérent les requêtes et les réponse

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // Récupération de toutes les sauces
        .then(sauces => res.status(200).json(sauces))
        next();
};

exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({_id: req.params.id}) // Récupération d'un seul élément | Comparaison de l'id envoyé avec celui de la base de donnée
        .then(sauce => res.status(200).json(sauce))
        .catch(() => res.status(400).json(error));
};

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        ...req.body // L'opérateur spread '...' permet de copier les champs du body de la request et détaillera les informations
    });
    sauce.save()
        .then(() => res.status(201).json({message : 'Objet enregistré'}))
        .catch(() => res.status(400).json(error));
        next();
};

exports.modifySauces = (req, res, next) => {
};

exports.deleteSauces = (req, res, next) => {
    Sauce.delete({_id: req.params.id})
        .then(sauce => res.status(200).json({message: "Sauce Supprimée"}))
        .catch(() => res.status(400).json(error));
};

exports.likeOrDislikesSauce = (req, res, next) => {
};