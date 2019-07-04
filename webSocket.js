const webSocketServer = require('websocket').server;
let connexion = null;
const createWebSocket = server => {
    const webServer = new webSocketServer({
        httpServer: server
    });

    webServer.on('request', request => {
        connexion = request.accept(null, request.origin);
        connexion.on('message', message => {
            console.log(message);
            if (message.type === 'utf8') {
                if (message.utf8Data === 'ping') {
                    connexion.sendUTF('pong');
                }
            }
        });
        connexion.on('close', connexion => {
            console.log('close', connexion);
        });
    });
    /*
    webServer.onopen = event => {
        webServer.send('Voici un texte que le serveur attend de recevoir dès que possible !');
    };
    webServer.onmessage = event => {
        console.log(event.data);
    };
    */
};

module.exports = createWebSocket;
