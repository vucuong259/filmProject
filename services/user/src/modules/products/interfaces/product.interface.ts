import { Document, Types } from 'mongoose';

export interface ISpec {
  key: String;
  value: String;
  unique: String;
}

export interface IProduct extends Document {
  category: Types.ObjectId;
  code: String;
  name: String;
  price: Number;
  releaseDate: Date;
  weight: Number;
  specs: ISpec[];
  description: String;
  image: String;
  createdBy: Types.ObjectId;
}
