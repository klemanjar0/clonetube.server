import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserField, UserSchema } from '../../models/User';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';
import { compareHash, hash } from '../../utils/functions';
import jwtConstants from '../../config/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            const user: UserDocument = this;

            if (!user.isModified(UserField.password)) return next();

            try {
              user[UserField.password] = await hash(user[UserField.password]);
              next();
            } catch (e) {
              next(e);
            }
          });

          schema.pre('save', function (next) {
            const user: UserDocument = this;
            user[UserField.updatedAt] = Date.now();
            next();
          });

          schema.methods.comparePassword = async function (
            candidatePassword: string,
          ) {
            try {
              return await compareHash(
                candidatePassword,
                this[UserField.password],
              );
            } catch (e) {
              return e;
            }
          };

          return schema;
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
