import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../models/User';
import { UserCreatePayload } from './entities';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(userPayload: UserCreatePayload): Promise<User> {
    const user = await new this.userModel(userPayload);
    return await user.save();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
