import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ example: '+989121234567' })
  @IsNotEmpty()
  @IsString()
  input: string;
}
