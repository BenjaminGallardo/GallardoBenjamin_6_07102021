const mongoose = require('mongoose'); // Importation de mongoose pour utiliser une méthode spécifique

const sauceSchema = mongoose.Schema({ // La fonction schema créé la structure d'un élément dans la base de données et donc dans les requêtes
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {types: Number},
    userLikes: [{type: String}],
    userDislikes: [{type: Array}]
});

module.exports = mongoose.model('Sauce', sauceSchema); // Exportation du schéma pour une utilisation dans les controllers
