import { Schema, Document } from 'mongoose';
import { CommonConst } from '../../../shared/constant/common.const';

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    isDisabled: { type: Boolean, default: false },
    description: { type: String },
    isChildOf: { type: Schema.Types.ObjectId, default: null },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: CommonConst.USER_SCHEMA_NAME,
    },
  },
  {
    timestamps: true,
  },
);

export type CategoryDocument = any & Document;
