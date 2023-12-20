import { DocsPagination } from '../interfaces/docs-pagination.interface';

export function pagination(result, total, page, limit): DocsPagination {
  const totalPages = Math.ceil(total / limit);
  const currentPage = page;

  return {
    docs: result,
    meta: {
      current: currentPage,
      last: totalPages,
      pageSize: limit,
      from: (currentPage - 1) * limit + 1,
      to: Math.min(currentPage * limit, total),
      total,
    },
  };
}
