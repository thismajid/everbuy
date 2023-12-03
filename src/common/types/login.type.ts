import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ example: '+989121234567' })
  @IsNotEmpty()
  @IsString()
  input: string;
}

export class VerifyLoginAuthDto extends LoginAuthDto {
  @ApiProperty({ example: '7777' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
