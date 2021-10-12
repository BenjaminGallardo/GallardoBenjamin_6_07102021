const multer = require('multer'); // Importation du module 'multer

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

// Objet de configuration de multer
const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { // Destination où les fichiers seront enregistrés
        callback(null, 'images'); // 'null' précise qu'il ni a pas d'erreur | 'images' la destination des éléments enregistrés
    },
    fillename : (req, file, callback) => { // Explication du nom de fichiers à utiliser (On ne veut pas avoir deux fichiers de même nom)
        const name = file.originalname.split(' ').join('_'); // Récupération du nom original, récupération en tableau des éléments à chaque espace, on lie les éléments avec des underscores
        const extension = MIME_TYPES[file.mimetype]; // Il faut appliquer à une extension du fichiers
        callback(null, name + Date.now() + '.' + extension);
    } 
});

// Exportation du module multer, avec son objet storage, précision de single pour fichiers unique 'images'
module.exports = multer({ storage: storage }).single('image');