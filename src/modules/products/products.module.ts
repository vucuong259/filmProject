import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { CommonConst } from '../../shared/constant/common.const';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommonConst.PRODUCT_SCHEMA_NAME, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
