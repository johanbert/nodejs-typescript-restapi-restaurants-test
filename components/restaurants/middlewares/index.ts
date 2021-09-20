import express from 'express';
class RestaurantsMiddleware {
    async validatePostRequiredFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.body || !req.body.lat && !req.body.lon) 
            res.status(400).send({ errors: ['Missing required fields: lat and lon'] })
        else 
            next();
    }

};
export default new RestaurantsMiddleware();
        