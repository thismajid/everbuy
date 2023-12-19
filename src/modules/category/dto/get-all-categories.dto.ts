import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toNumber } from 'src/common/utils';

export class GetAllCategoriesDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  public page: number = 1;

  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber()
  @IsOptional()
  public limit: number = 10;
}
