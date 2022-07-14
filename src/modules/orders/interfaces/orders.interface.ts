import { Document, Types } from 'mongoose';

export interface ISpec {
  key: String;
  value: String;
  unique: String;
}

export interface IOrder extends Document {
  category: Types.ObjectId;
  code: String;
  name: String;
  price: Number;
  releaseDate: Date;
  weight: Number;
  specs: ISpec[];
  description: String;
  createdBy: Types.ObjectId;
}
