import express from 'express';
import RestaurantsService from '../services';
import debug from 'debug';
const log: debug.IDebugger = debug('app:restaurants-controller');

class RestaurantsController {
    async listRestaurants(req: express.Request, res: express.Response) {
        const   lat = req.body.lat,
                lon = req.body.lon,
                radio  = (req.body.radio) ? Number(req.body.radio) : 500; // 500 meters by default
        const restaurants = await RestaurantsService.list(lat,lon, radio);
        if ( Object.keys(restaurants).includes("status") && restaurants.status == 'INVALID_REQUEST')
            return res.status(404).send(restaurants);
        return res.status(200).send(restaurants);
    }
    async listHistory(req: express.Request, res: express.Response) {
        const   limit  = (req.query.limit) ? Number(req.query.limit) : 100,
                page   = (req.query.page)  ? Number(req.query.page)  : 0;
        const history = await RestaurantsService.listHistory(limit, page);
        res.status(200).send(history);
    }
}

export default new RestaurantsController();
