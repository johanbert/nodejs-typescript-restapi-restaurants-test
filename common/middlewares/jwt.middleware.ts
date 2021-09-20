import express from 'express';
import jwt from 'jsonwebtoken';
import { GLOBAL_CONFIG } from "../../config/";
import usersService from '../../components/users/services';

class JwtMiddleware {

    async validateJWTUserID( req: express.Request, res: express.Response, next: express.NextFunction ) {
        const user: any = await usersService.getUserByEmailWithPassword( res.locals.jwt.email );
        if (user) {
            res.locals = {
                userId: user._id,
                email: user.email,
            };
            next();
        } else {
            return res.status(400).send({ errors: ['Invalid token user'] });
        }
    }

    validateJWTNeeded( req: express.Request, res: express.Response, next: express.NextFunction ) {
        if (req.headers['authorization']) {
            try {
                const authorization = (req.headers['authorization'] as string).split(' ');
                if (authorization[0] !== 'Bearer') 
                    return res.status(401).send( { errors: ['You are not authorized'] } );
                else {
                    res.locals.jwt = jwt.verify( authorization[1], GLOBAL_CONFIG.JWT_SECRET) //as Jwt;
                    next();
                }
            } catch (err) {
                return res.status(403).send({ errors: [err] });
            }
        } else {
            return res.status(401).send( { errors: ['You are not authorized'] } );
        }
    }
}

export default new JwtMiddleware();
