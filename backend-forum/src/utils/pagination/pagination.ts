export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Utility untuk menghitung pagination parameters
 * @param options - Pagination options dengan default values
 * @returns Object berisi skip, limit, dan page yang sudah divalidasi
 */
export const getPaginationParams = (options: PaginationOptions = {}) => {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 10)); // Max 100, min 1
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Utility untuk membuat pagination metadata
 * @param page - Current page
 * @param limit - Items per page
 * @param total - Total items
 * @returns Pagination metadata object
 */
export const createPaginationMeta = (page: number, limit: number, total: number): PaginationMeta => {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Utility untuk membuat pagination result yang konsisten
 * @param data - Data array
 * @param page - Current page
 * @param limit - Items per page
 * @param total - Total items
 * @returns PaginationResult object
 */
export const createPaginationResult = <T>(
  data: T,
  page: number,
  limit: number,
  total: number
): PaginationResult<T> => {
  return {
    data,
    pagination: createPaginationMeta(page, limit, total),
  };
};

/**
 * Utility untuk validasi pagination options
 * @param options - Raw pagination options dari request
 * @returns Validated pagination options
 */
export const validatePaginationOptions = (options: {
  page?: string | number;
  limit?: string | number;
}): PaginationOptions => {
  const page = typeof options.page === 'string' ? parseInt(options.page, 10) : options.page;
  const limit = typeof options.limit === 'string' ? parseInt(options.limit, 10) : options.limit;

  return {
    page: isNaN(page!) ? undefined : page,
    limit: isNaN(limit!) ? undefined : limit,
  } as PaginationOptions;
};