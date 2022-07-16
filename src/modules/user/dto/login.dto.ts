import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiPropertyOptional({
    description: 'usernameOrEmail',
    example: 'cuongvm',
  })
  @IsString()
  @IsNotEmpty()
  usernameOrEmail: string;

  @ApiPropertyOptional({
    description: 'password',
    example: 'password!',
  })
  @IsNotEmpty()
  password: string;
}
