import {RoutesCommon} from '../../../../common/classes/routes.common';
import RestaurantsController from '../../controllers';
import RestaurantsMiddleware from '../../middlewares';
import JwtMiddleware from '../../../../common/middlewares/jwt.middleware';
import express from 'express';

export class RestaurantsRoutes extends RoutesCommon {
    constructor(app: express.Application) {
        super(app, 'RestaurantsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/api/v1/restaurants`)
            .all( 
                JwtMiddleware.validateJWTNeeded,
                JwtMiddleware.validateJWTUserID
            )
            .post( 
                RestaurantsMiddleware.validatePostRequiredFields,
                RestaurantsController.listRestaurants 
                )
        this.app
            .route(`/api/v1/restaurants/history`)
            .all( 
                JwtMiddleware.validateJWTNeeded,
                JwtMiddleware.validateJWTUserID
            )
            .get(
                RestaurantsController.listHistory 
                )
        return this.app;
    }
}