import { Schema } from 'mongoose';
import { CommonConst } from '../../../shared/constant/common.const';

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: Number, default: 0 },
    isDisabled: { type: Boolean, default: false },
    description: { type: String },
    IsChildOf: { type: Number, default: null },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: CommonConst.USER_SCHEMA_NAME,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.static('increment', async function (categoryId) {
  const count = await this.findByIdAndUpdate(
    categoryId,
    { $inc: { code: 1 } },
    { new: true, upsert: true },
  );
  return count.code;
});
