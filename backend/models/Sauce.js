const mongoose = require('mongoose'); // On importe le module mongoose

const sauceSchema = mongoose.Schema({ // La fonction schema nous est mis à disposition par mongoose
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {types: Number},
    userLikes: {type: Array},
    userDislikes: {type: Array}
});

module.exports = mongoose.model('Sauce', sauceSchema); // Ici on exporte notre schéma