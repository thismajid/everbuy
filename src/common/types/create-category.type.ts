import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: '+989121234567' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'example content' })
  @IsOptional()
  content?: string;
}
