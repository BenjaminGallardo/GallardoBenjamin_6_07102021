// Les controllers prennent la logique métier de chaque route pour les importer de manière plus intuitives après dans les middleware

const Sauce = require('../models/Sauce'); // On impotre notre model de sauce ici puisque les middleware gérant les requêtes et réponse se trouve ici

exports.createSauce = (req, res, next) => { // Ici on exporte une fonction qui créé une sauce
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({message : 'Objet enregistré'}))
        .catch(() => res.status(400).json(error));
        next();
};

exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({_id: req.params.id}) // On souhaite récupérer un seul élément donc on compare l'id envoyé avec celui de la base de donnée
        .then(sauce => res.status(200).json(sauce))
        .catch(() => res.status(400).json(error));
};

exports.getAllSauces = (req, res, next) => { // cette méthode donne la possibilité de configurer un middleware à notre app
    Sauce.find() // Ici on cherhce à récupérer toutes nos sauces
        .then(sauces => res.status(200).json(sauces)) //  On les renvoie au format json
        .catch(() => res.status(400).json(error));
};

exports.modifySauces = (req, res, next) => {
};

exports.deleteSauces = (req, res, next) => {
};

exports.likeOrDislikesSauce = (req, res, next) => {
};