const mongoose = require('mongoose'); // Importation de mongoose pour utiliser une méthode spécifique

const uniqueValidator = require('mongoose-unique-validator'); // Package précisant que chaque élément est unique (ne peut pas exister deux fois)

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true}, // Utilisation de 'unique' pour éviter qu'une adresse email soit utilisé plusieurs fois
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // La base de donnée ne peut pas contenir deux fois la même adresse email 

module.exports = mongoose.model('User', userSchema); // Exportation du schéma pour une utilisation dans les controllers