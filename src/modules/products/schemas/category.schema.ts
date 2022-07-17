import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/User.schema';

export type CategoryDocument = Category & mongoose.Document;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true })
  name: string;
  @Prop({ default: false })
  isDisabled: boolean;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  isChildOf: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
