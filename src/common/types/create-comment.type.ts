import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CommentStatus } from '../enums';

export class CreateCommentDto {
  @ApiProperty({ example: 'example comment title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'example content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({ example: CommentStatus.PENDING })
  @IsEnum(CommentStatus)
  @IsString()
  status: CommentStatus = CommentStatus.PENDING;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
