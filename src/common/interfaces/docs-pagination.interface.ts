export interface DocsPagination {
  docs: [];
  meta: {
    current: number;
    last: number;
    pageSize: number;
    from: number;
    to: number;
    total: number;
  };
}
