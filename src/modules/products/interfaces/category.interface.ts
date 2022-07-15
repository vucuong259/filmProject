import { Document, Types } from 'mongoose';

export interface ICategory extends Document {
  code: String;
  name: String;
  isDisabled: Boolean;
  description: String;
  image: String;
  createdBy: Types.ObjectId;
}
