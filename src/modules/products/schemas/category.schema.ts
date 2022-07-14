import mongoose from 'mongoose';
import { CommonConst } from '../../../shared/constant/common.const';

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  isDisabled: { type: Boolean, default: false },
  description: { type: String },
  IsChildOf: { type: String, default: null },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CommonConst.USER_SCHEMA_NAME,
  },
});
