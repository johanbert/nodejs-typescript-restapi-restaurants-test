import mongooseService from '../../../common/services/mongoose.service';
import shortid from 'shortid';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { CreateUserDto } from '../dto/create.dto';
import { PatchUserDto } from '../dto/patch.dto';
import { PutUserDto } from '../dto/put.dto';
import { GLOBAL_CONFIG } from "../../../config";

const log: debug.IDebugger = debug('app:Users-dao');

class UsersDao {
    private COLLECTION = 'users';
    private Schema = mongooseService.getMongoose().Schema;
    private userSchema = new this.Schema(UserModel);
    private User = mongooseService.getMongoose().model(this.COLLECTION, this.userSchema);

    constructor() { log('Created new instance of UsersDao') }

    async addUser(userFields: CreateUserDto) {
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...userFields,
        });
        await user.save();
        return { ok : true };
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({ email: email }).exec();
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({ email: email })
            .select('_id email +password')
            .exec();
    }
    async createAccessToken(email: string) {
        let dateNow = Math.floor(Date.now() / 1000);
        return jwt.sign({ email, iat: dateNow }, GLOBAL_CONFIG.JWT_SECRET,{ expiresIn: GLOBAL_CONFIG.JWT_LIFETIME });
    }

    async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }

    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId }).populate('user').exec();
    }

    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateUserById( userId: string, userFields: PatchUserDto | PutUserDto ) {
        const existingUser = await this.User.findOneAndUpdate(
                                { _id: userId },
                                { $set: userFields },
                                { new: true }
                            ).exec();

        return existingUser;
    }
}

export default new UsersDao();
