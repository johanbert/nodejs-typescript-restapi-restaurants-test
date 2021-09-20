import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const winstonLoggerOptions: expressWinston.LoggerOptions = {
    transports: [
        // new winston.transports.Console(),
        new winston.transports.Console({level:'debug'}),
        new winston.transports.File({
            maxsize: 10000000, // 10MB, esta en BYTES
            maxFiles:5,
            filename:`${__dirname}/../logs/log-api.log`})
    ],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(), 
        winston.format.colorize({ all: true }),
        winston.format.simple(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf((info:any)=>{
            return `[${info.timestamp}] ${info.message}, ${info.meta.res?.statusCode}, ${info.meta.responseTime}, ${info.meta.req.headers.host}`
        }),
    )}

export default winstonLoggerOptions;