import mongooseService from '../../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import { GLOBAL_CONFIG } from "../../../config";
import axios, { AxiosResponse } from 'axios';
import { HistoryModel } from '../models/history.model';

const log: debug.IDebugger = debug('app:restaurants-dao');

class RestaurantsDAO {   
    private collection = 'restaurants'
    private Schema = mongooseService.getMongoose().Schema;
    private historySchema = new this.Schema(HistoryModel);
    private History = mongooseService.getMongoose().model(this.collection, this.historySchema);

    constructor() {
        log('Created new instance of RestaurantsDao');
    }

    async getHistory( limit = 25, page = 0) {
        return this.History.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async addHistoryRequest(response: any) {
        const _id = shortid.generate();
        const history = new this.History({
            _id,
            response: response,
            created_at : Date.now()
        });
        await history.save();
        return { ok : true };
    }

    async getRestaurants( lat: number, lon: number, radio: number) {
        // lat = lat || -33.8670522; // by default for tests
        // lon = lon || 151.1957362; // by default for tests
        const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lon}&radius=${radio}&type=restaurant&key=${GLOBAL_CONFIG.API_KEY}`
        let result: AxiosResponse = await axios.get(URL);
        const hasError = Object.keys(result.data).includes("error_message")
        if (hasError) {
            let {error_message, status } = result.data;
            this.addHistoryRequest({error_message, status});
            return {error_message, status}
        }
        let response: any = Array.from(result.data.results).map( ({ name,geometry:{ location: {lat, lng} } }: any) => 
                                                            ({ name,location : {lat, lng} } ) );
        this.addHistoryRequest(response);

        return response
    }

}

export default new RestaurantsDAO();
