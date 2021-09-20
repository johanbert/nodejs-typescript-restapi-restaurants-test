import mongoose from 'mongoose';
import debug from 'debug';
import { DBS } from "../../config/";
const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
    };
    private connection = `${DBS.MONGODB.HOST}://${DBS.MONGODB.SERVER}/${DBS.MONGODB.NAME}`

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose
            .connect(this.connection, this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected', this.connection);
            })
            .catch((err) => {
                const retrySeconds = 15;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                log(this.connection)
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}
export default new MongooseService();
