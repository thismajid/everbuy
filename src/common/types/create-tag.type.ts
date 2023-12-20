import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'example tag name' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'example content' })
  @IsOptional()
  content?: string;
}
