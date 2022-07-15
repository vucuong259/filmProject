import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { CommonConst } from '../../shared/constant/common.const';
import { CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommonConst.PRODUCT_SCHEMA_NAME,
        schema: ProductSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: CommonConst.CATEGORY_SCHEMA_NAME,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
