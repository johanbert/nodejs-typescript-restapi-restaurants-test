import express from 'express';
import { GLOBAL_CONFIG } from '../../config';
import {RoutesCommon} from './routes.common';
import debug from 'debug';

const debugLog: debug.IDebugger = debug('app');
export class Server{
    public app: express.Application;
    public port:number;

    constructor(){
        this.app = express();
        this.port = GLOBAL_CONFIG.SERVER_PORT;
    }
    start( routes: Array<RoutesCommon> ){
        this.app.listen( this.port, ()=>{
            debugLog(`::Server running at http://localhost:${this.port}`);
            routes.forEach((route: RoutesCommon) => {
                debugLog(`Routes configured for: ${route.getName()}`);
            });
        });
    }
}
export const serverSingleton = new Server();