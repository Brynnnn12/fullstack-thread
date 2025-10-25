# Pagination Utility

Utility untuk menangani pagination yang reusable di seluruh aplikasi.

## Features

- ✅ Validasi parameter pagination (page, limit)
- ✅ Hitung skip untuk database queries
- ✅ Buat metadata pagination yang konsisten
- ✅ Type-safe dengan TypeScript
- ✅ Reusable di berbagai repository

## Usage

### Basic Pagination

```typescript
import {
  getPaginationParams,
  createPaginationResult,
} from "../utils/pagination/index.js";

// Di repository
export const findAllItems = async (page: number = 1, limit: number = 10) => {
  const {
    skip,
    page: validatedPage,
    limit: validatedLimit,
  } = getPaginationParams({ page, limit });

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      skip,
      take: validatedLimit,
      // ... other options
    }),
    prisma.item.count(),
  ]);

  return createPaginationResult(items, validatedPage, validatedLimit, total);
};
```

### Controller Response

```typescript
// Di controller
const result = await findAllItems(page, limit);

successResponse(
  res,
  {
    items: result.data,
    pagination: result.pagination,
  },
  "Items berhasil diambil",
  200
);
```

## API Reference

### `getPaginationParams(options?: PaginationOptions)`

Menghitung parameter pagination yang sudah divalidasi.

**Parameters:**

- `options.page` (optional): Page number, default 1, min 1
- `options.limit` (optional): Items per page, default 10, max 100, min 1

**Returns:**

```typescript
{
  page: number,
  limit: number,
  skip: number
}
```

### `createPaginationResult<T>(data: T, page: number, limit: number, total: number)`

Membuat response pagination yang konsisten.

**Parameters:**

- `data`: Data array atau object
- `page`: Current page
- `limit`: Items per page
- `total`: Total items

**Returns:**

```typescript
{
  data: T,
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

### `validatePaginationOptions(options)`

Validasi dan parse pagination options dari request query.

**Parameters:**

- `options.page`: String atau number dari req.query.page
- `options.limit`: String atau number dari req.query.limit

**Returns:** `PaginationOptions`

## Response Format

```json
{
  "status": "success",
  "message": "Items berhasil diambil",
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

## Default Values

- `page`: 1 (minimum)
- `limit`: 10 (untuk threads), 20 (untuk posts)
- `max limit`: 100 (untuk posts), 50 (untuk threads)

## Type Definitions

```typescript
interface PaginationOptions {
  page?: number;
  limit?: number;
}

interface PaginationResult<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```
