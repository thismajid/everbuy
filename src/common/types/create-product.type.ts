import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'example product title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'example description' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1000 })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({ example: 1000 })
  @IsNumber({ maxDecimalPlaces: 2 })
  discount: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  quantity: number;
}
