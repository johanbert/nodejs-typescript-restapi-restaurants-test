import express from 'express';
import UsersService from '../services';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
    
    async createUser(req: express.Request , res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await UsersService.create(req.body);
        res.status(201).send( userId );
    }

    async logIn(req: express.Request, res: express.Response) {
        const token = await UsersService.createAccessToken(req.body.email);
        res.status(200).json({token});
    }

    async listUsers(req: express.Request, res: express.Response) {
        const   userId = res.locals.userId,
                limit  = (req.query.limit) ? Number(req.query.limit) : 100,
                page   = (req.query.page)  ? Number(req.query.page)  : 0 ;
        const users = await UsersService.list(userId, limit, page);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await UsersService.readById(req.params.userId);
        res.status(200).send(user);
    }
}

export default new UsersController();
