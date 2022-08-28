import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserField, UserSchema } from '../../models/User';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import Const from '../../constants';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
            const user: UserDocument = this;

            if (!user.isModified(UserField.password)) return next();

            bcrypt.genSalt(Const.SALT_WORK_FACTOR, function (err, salt) {
              if (err) return next(err);

              bcrypt.hash(user[UserField.password], salt, function (err, hash) {
                if (err) return next(err);
                user[UserField.password] = hash;
                next();
              });
            });
          });

          schema.pre('save', function (next) {
            const user: UserDocument = this;
            user[UserField.updatedAt] = Date.now();
            next();
          });

          schema.methods.comparePassword = function (candidatePassword, cb) {
            bcrypt.compare(
              candidatePassword,
              this[UserField.password],
              function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
              },
            );
          };

          return schema;
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
