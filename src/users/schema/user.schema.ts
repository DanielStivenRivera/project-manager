import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  firstName: string;
  @Prop()
  secondName: string;
  @Prop({ required: true })
  firstLastName: string;
  @Prop()
  secondLastName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
  @Prop({ required: true })
  userName: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
