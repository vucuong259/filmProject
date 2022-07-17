import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { CommonConst } from '../../shared/constant/common.const';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryRepository } from './repositories/category.repository';
import { User, UserSchema } from '../user/schemas/User.schema';
import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: CommonConst.PRODUCT_SCHEMA_NAME,
        schema: ProductSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoryRepository, UserService, UserRepository],
})
export class ProductsModule {}
