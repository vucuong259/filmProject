import { Schema } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const SpecSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String },
    unique: { type: String },
  },
  { _id: false },
);

export const ProductSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number },
    releaseDate: { type: Date },
    weight: { type: Number },
    specs: { type: [SpecSchema] },
    description: { type: String },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);
