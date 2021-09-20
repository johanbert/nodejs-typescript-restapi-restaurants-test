import express from 'express';
import argon2 from "argon2";
import userService from '../services';
import debug from 'debug';
const log: debug.IDebugger = debug('app:user-middleware');

class UsersMiddleware {
    async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.body || !req.body.email || !req.body.password) {
            res.status(400).send({ errors: ['Missing required fields: email and password'] });
        } else {
            next();
        }
    }

    async validateEmailFormat(req: express.Request, res: express.Response, next: express.NextFunction) {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !regExp.test( String(req.body.email).toLowerCase() ) ) {
            res.status(400).send({ errors: ['Email format incorrect, is not valid']});
        } else {
            next();
        }
    }

    async validatePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        const alloweds = {
            minChars : "10",
            maxChars : "", 
            uppers: "A-Z",
            lowers: "a-z",
            specials: "!@#?\\]"
        }
        let regExp = new RegExp(`(?=^.{${alloweds.minChars},${alloweds.maxChars}}$)(?=.*[${alloweds.lowers}])(?=.*[${alloweds.uppers}])(?=.*[${alloweds.specials}])`)

        if ( !regExp.test( String(req.body.password) ) ) {
            res.status(400).send({ errors: [`Password is not valid, must be contains at least ${alloweds.minChars} characters, one lowercase letter, one uppercase letter and one of the following characters: ! @ # ? ]`]});
        } else {
            next();
        }
    }

    async validateEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const email = await userService.getUserByEmail(req.body.email);
        if (email) {
            res.status(400).send({ errors: ['User email already exists'] });
        } else {
            next();
        }
    }

    async validateEmailExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            res.status(400).send({ errors: ['User email doesnt exists'] });
        } else {
            next();
        }
    }

    async validateEmailAndPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await userService.getUserByEmailWithPassword(req.body.email);
        const passwordValidate = await argon2.verify(user.password, req.body.password);

        if (user && passwordValidate) {
            req.body.email = user.email;
            next();
        } else {
            res.status(400).send({ errors: ['Invalid email or password, doesnt match'] });
        }
    }
    
    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
            const user = await userService.readById(req.params.userId);
            if (user) {
                next();
            } else {
                res.status(404).send({
                    errors: [`User ${req.params.userId} not found`],
                });
            }
        }
        
};
export default new UsersMiddleware();
        