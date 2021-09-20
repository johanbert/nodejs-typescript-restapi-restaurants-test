require('dotenv').config();
import server from "./config/server.config";
import routes from "./config/routes.config";
 
server.start(routes);