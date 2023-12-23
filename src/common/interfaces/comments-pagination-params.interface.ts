import { IPaginationParams } from './pagination-params.interface';

export interface ICommentsPaginationParams extends IPaginationParams {
  productId: number;
}
