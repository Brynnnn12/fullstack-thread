# Testing Infrastructure

This project includes a comprehensive testing infrastructure with unit tests, integration tests, and test utilities.

## Test Structure

```
__tests__/
├── setup/
│   ├── jest.setup.ts          # Jest global setup and teardown
│   └── test-helpers.ts        # Test utilities and database helpers
├── fixtures/
│   └── test-data.ts           # Test data factories and fixtures
├── unit/                      # Unit tests (testing individual functions/services)
│   ├── auth/
│   │   └── auth.service.test.ts
│   ├── threads/
│   │   └── thread.service.test.ts
│   └── posts/
├── integration/               # Integration tests (testing API endpoints)
│   ├── auth/
│   │   └── auth.integration.test.ts
│   ├── threads/
│   └── posts/
└── fixtures/                  # Test data and fixtures
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run specific test file

```bash
npm test -- __tests__/unit/auth/auth.service.test.ts
```

### Run tests for specific pattern

```bash
npm test -- --testNamePattern="should register a new user"
```

## Test Configuration

### Jest Configuration (`jest.config.ts`)

- Uses `ts-jest` for TypeScript support
- Runs in Node.js environment
- Includes coverage reporting
- Uses custom setup file for database initialization
- 10 second timeout for async operations

### Test Database

Tests use a separate test database to avoid affecting development/production data:

- Database URL: `process.env.DATABASE_URL` or `postgresql://test:test@localhost:5432/forum_test`
- Database is cleaned before each test
- Prisma client is connected/disconnected automatically

## Writing Tests

### Unit Tests

Unit tests focus on testing individual functions or services in isolation.

```typescript
import { myFunction } from "../../../src/path/to/function";

describe("myFunction", () => {
  it("should do something", async () => {
    const result = await myFunction(input);
    expect(result).toBe(expectedOutput);
  });
});
```

### Integration Tests

Integration tests test complete API endpoints and workflows.

```typescript
import request from "supertest";
import {
  setupTestEnvironment,
  teardownTestEnvironment,
} from "../../setup/test-helpers";

describe("API Endpoint", () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await setupTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment(context);
  });

  it("should work end-to-end", async () => {
    const response = await request(context.baseUrl)
      .post("/api/endpoint")
      .send(testData)
      .expect(200);

    expect(response.body).toHaveProperty("id");
  });
});
```

## Test Utilities

### Test Helpers (`__tests__/setup/test-helpers.ts`)

- `setupTestEnvironment()`: Starts test server and cleans database
- `teardownTestEnvironment()`: Closes server and disconnects database
- `createTestUser()`: Creates a test user in database
- `createTestThread()`: Creates a test thread in database
- `createTestPost()`: Creates a test post in database

### Test Data (`__tests__/fixtures/test-data.ts`)

- Predefined valid and invalid test data
- Factory functions for creating test entities
- Consistent test data across all tests

## Best Practices

### 1. Test Isolation

- Each test should be independent
- Database is cleaned before each test
- Use unique data for each test to avoid conflicts

### 2. Test Naming

- Use descriptive test names that explain what is being tested
- Follow the pattern: `should [expected behavior] when [condition]`

### 3. Test Coverage

- Aim for high test coverage (>80%)
- Cover both happy path and error scenarios
- Test edge cases and boundary conditions

### 4. Test Performance

- Keep tests fast and focused
- Use `beforeAll` and `afterAll` for expensive setup/teardown
- Avoid unnecessary database operations

### 5. Test Maintainability

- Keep tests DRY (Don't Repeat Yourself)
- Use shared utilities and fixtures
- Update tests when changing business logic

## Environment Variables for Testing

```bash
# Test database connection
DATABASE_URL="postgresql://test:test@localhost:5432/forum_test"

# JWT secret for testing
JWT_SECRET="test-jwt-secret-key-for-testing-only"

# Node environment
NODE_ENV="test"
```

## Troubleshooting

### Common Issues

1. **Database connection errors**

   - Ensure test database exists and is accessible
   - Check DATABASE_URL environment variable

2. **Import errors**

   - Verify file paths are correct
   - Check TypeScript compilation

3. **Test timeouts**

   - Increase timeout in jest.config.ts
   - Check for async operations that aren't resolving

4. **Coverage issues**
   - Ensure all source files are included in coverage collection
   - Check exclude patterns in jest.config.ts

### Debugging Tests

```bash
# Run tests with debug logging
npm test -- --verbose

# Run specific test with debugger
npm test -- --inspect-brk __tests__/unit/auth/auth.service.test.ts
```

## Continuous Integration

For CI/CD pipelines, ensure:

1. Test database is available
2. Environment variables are set
3. Dependencies are installed
4. Run `npm run test:coverage` for coverage reports

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain or improve test coverage
4. Update this documentation if needed
