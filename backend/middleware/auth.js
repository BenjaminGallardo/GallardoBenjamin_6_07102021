const jwt = require('jsonwebtoken'); // Importation du package permettant de vérifier les tokens

module.exports = (req, res, next) => {
    try { 
        // 1 : Récupérer le token dans le header
        const token = req.headers.authorization.split(' ')[1] //Récupération d'un tableau avec le bearer en premier élément et le token en second élément, seul le second nous intéresse
        // 2 : Décodage du token
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        // 3 : Une fois décoder récupération de l'user en objet js
        const userId = decodedToken.userId;
        // 4 : Une fois récupérer on va voir si la requête effectuée correspond au token enregitré
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable' // L'instruction throw permet de lever une exception définie
        } else {
            next(); // On 'next' seulement ici puisque ce middleware sera appliquée partout donc si tout est vérifié alors on peut réalisé la requête CRUD
        }
    } catch (error){
        res.status(401).json({ error: error | 'Requête non authentifié !'});
    }
}