import { Schema, Types, Document, Model, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import Const from '../constants';
import { isEmail } from 'validator';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatarId?: string;

  updatedAt: number;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, createIndexes: { unique: true } },
  email: {
    type: String,
    required: true,
    validate: [isEmail, Const.validationErrors.invalidEmail],
  },
  password: { type: String, required: true },
  avatarId: { type: String },
  updatedAt: { type: Number },
});

/**
 * Used to hash password before create
 */
UserSchema.pre('save', function (next) {
  const user: IUser = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(Const.SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Used to create timestamp
 */
UserSchema.pre('save', function (next) {
  const user: IUser = this;
  user.updatedAt = Date.now();
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const User: Model<IUser> = model('User', UserSchema);
