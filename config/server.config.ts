import express from 'express';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';
import winstonLoggerOptions from "./debug.config";
import {serverSingleton, Server} from "../common/classes/server.common";
import {GLOBAL_CONFIG, serverConfig} from "./";
import errorhandlerMiddleware from '../common/middlewares/errorhandler.middleware';

const server:Server = serverSingleton;

server.app.use( express.json() );
server.app.use( express.urlencoded(serverConfig.bodyparser) );
server.app.use( cors(serverConfig.cors) );
server.app.use( helmet() );
server.app.use( expressWinston.logger(winstonLoggerOptions) );
server.app.use( expressWinston.errorLogger(winstonLoggerOptions) );
server.app.use( errorhandlerMiddleware.badRequestHandler );
server.app.use( errorhandlerMiddleware.errorHandler );

server.app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`:Server running at http://localhost:${GLOBAL_CONFIG.SERVER_PORT}`);
});

export default server;