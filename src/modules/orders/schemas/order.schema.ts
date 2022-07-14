import mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number },
    releaseDate: { type: Date },
    weight: { type: Number },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);
