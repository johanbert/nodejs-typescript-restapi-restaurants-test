import RestaurantsDao from '../dao';

class RestaurantsService {

    async list(lat: number, lon: number, radio: number) {
        return RestaurantsDao.getRestaurants(lat, lon, radio);
    }
    async listHistory(limit: number, page: number) {
        return RestaurantsDao.getHistory(limit,page);
    }
    
}

export default new RestaurantsService();
