const http = require('http'); // On importe le package HTTP et qui nous permet de créer un serveur
const app = require('./app') // On récupère notre application express

const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000'); // La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
  app.set('port', port); // Il est essentielle de dire à l'application express sur quel port elle va tourner
  
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

// On va créer notre serveur et appelée la méthode 'createserver' du package http qui exécutera une fonction à chaque requête
const server = http.createServer(app); // On passe notre application au server pour qu'il l'utilise à chaque requête

server.on('error', errorHandler); // La fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
server.on('listening', () => { // Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Le serveur doit attendre les requêtes envoyées par le frontend et donc doit écouter un prototype. Il faut donc l'initialiser :
server.listen(port);