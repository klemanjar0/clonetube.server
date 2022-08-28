import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User &
  Document & {
    comparePassword?: (candidatePassword: string) => Promise<boolean>;
  };

export enum UserField {
  username = 'username',
  email = 'email',
  avatar = 'avatar',
  password = 'password',
  updatedAt = 'updatedAt',
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  [UserField.username]: string;

  @Prop({ required: true })
  [UserField.email]: string;

  @Prop({ required: true })
  [UserField.password]: string;

  @Prop({ required: false })
  [UserField.avatar]?: string;

  @Prop({ required: false })
  [UserField.updatedAt]: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
