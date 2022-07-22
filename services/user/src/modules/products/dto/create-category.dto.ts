import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Matches,
  Allow,
  IsOptional,
  Min,
  Max,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCategoryDto {
  @ApiPropertyOptional({
    description: 'Name of the category',
    example: 'Mũ bảo hiểm',
  })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Name of the category',
    example: '62d2d392a91caa1786e39202',
  })
  isChildOf: ObjectId;

  description: string;
}
