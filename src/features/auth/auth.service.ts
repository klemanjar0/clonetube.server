import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserField } from '../../models/User';
import { LoginPayload, UserCreatePayload } from './entities';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../../utils/types';

export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginPayload): Promise<string | null> {
    const user = await this.userModel.findOne({
      [UserField.username]: username,
    });
    if (await this.validateUser(username, password)) {
      const payload: JWTPayload = { username: user.username, sub: user._id };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      [UserField.username]: username,
    });

    if (user && (await user.comparePassword(pass))) {
      return user;
    }

    return null;
  }

  async create(userPayload: UserCreatePayload): Promise<User> {
    const user = await new this.userModel(userPayload);
    return await user.save();
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
