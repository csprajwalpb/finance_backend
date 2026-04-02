# API route design

Base URL: `/api`

Authentication approach for this setup:
- Use `POST /auth/register` to create a starter viewer account.
- Use `POST /auth/login` to receive a JWT token.
- Send the token in the `Authorization: Bearer <token>` header.

Role access:
- `VIEWER`: read-only access to financial records
- `ANALYST`: viewer access plus dashboard analytics
- `ADMIN`: full access, including user management and record deletion

## Authentication

- `POST /auth/register`
  - Access: Public
  - Purpose: Create a new viewer account
  - Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

- `POST /auth/login`
  - Access: Public
  - Purpose: Authenticate and receive a JWT
  - Body:
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

## User management

- `GET /users`
  - Access: `ADMIN`
  - Purpose: List all users

- `POST /users`
  - Access: `ADMIN`
  - Purpose: Create a user
  - Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "role": "ANALYST",
  "status": "ACTIVE"
}
```

- `PATCH /users/:id`
  - Access: `ADMIN`
  - Purpose: Update only user role and status
  - Body:
```json
{
  "role": "ANALYST",
  "status": "ACTIVE"
}
```

## Financial records

- `GET /financial-records`
  - Access: `VIEWER`, `ANALYST`, `ADMIN`
  - Query params: `type`, `category`, `userId`, `dateFrom`, `dateTo`, `page`, `limit`
  - Purpose: List financial records with filters and pagination
  - Example:
```text
/financial-records?type=EXPENSE&category=Marketing&dateFrom=2026-04-01T00:00:00.000Z&dateTo=2026-04-30T23:59:59.999Z&page=1&limit=10
```

- `POST /financial-records`
  - Access: `ANALYST`, `ADMIN`
  - Purpose: Create a financial record
  - Body:
```json
{
  "userId": 1,
  "type": "EXPENSE",
  "category": "Marketing",
  "amount": 3500.5,
  "notes": "Q1 campaign",
  "recordDate": "2026-04-01T00:00:00.000Z"
}
```

- `GET /financial-records/:id`
  - Access: `VIEWER`, `ANALYST`, `ADMIN`
  - Purpose: Get one record

- `PATCH /financial-records/:id`
  - Access: `ANALYST`, `ADMIN`
  - Purpose: Update a record
  - Body:
```json
{
  "category": "Operations",
  "amount": 4200,
  "notes": "Updated amount"
}
```

- `DELETE /financial-records/:id`
  - Access: `ADMIN`
  - Purpose: Delete a record

## Dashboard summary

- `GET /dashboard/summary`
  - Access: `ANALYST`, `ADMIN`
  - Response:
```json
{
  "totalIncome": 50000,
  "totalExpense": 18000,
  "netAmount": 32000
}
```

- `GET /dashboard/recent-transactions`
  - Access: `ANALYST`, `ADMIN`
  - Query params: `limit`
  - Purpose: Return the latest financial records for dashboard widgets

- `GET /dashboard/trends`
  - Access: `ANALYST`, `ADMIN`
  - Purpose: Return monthly income vs expense trend

- `GET /dashboard/category-totals`
  - Access: `ANALYST`, `ADMIN`
  - Purpose: Return totals grouped by type and category
