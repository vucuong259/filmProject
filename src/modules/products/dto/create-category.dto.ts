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

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  description: string;
}
