import {RoutesCommon} from '../../../../common/classes/routes.common';
import UsersController from '../../controllers';
import UsersMiddleware from '../../middlewares';
import express from 'express';

export default class UsersRoutes extends RoutesCommon {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/api/v1/users`)
            .all( 
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateEmailFormat,
                UsersMiddleware.validatePassword,
                UsersMiddleware.validateEmailDoesntExist,
            )
            .post(
                UsersController.createUser
            );
            
        this.app.route(`/api/v1/users/login`)
            .all(UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateEmailFormat,
                UsersMiddleware.validatePassword,
                UsersMiddleware.validateEmailExist,
                UsersMiddleware.validateEmailAndPassword
                )
            .post(UsersController.logIn)

        return this.app;
    }
}