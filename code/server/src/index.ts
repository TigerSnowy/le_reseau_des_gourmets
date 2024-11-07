import Server from "./core/server";

// démarrer le serveur
const server: Server = new Server();

// process.env permet d'accéder aux variables d'environnement
server.create().listen(process.env.PORT);
