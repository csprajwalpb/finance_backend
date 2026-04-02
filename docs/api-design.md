# API route design

Base URL: `/api`

Temporary auth approach for this minimal setup:
- Pass the current user id using the `x-user-id` header.
- The middleware loads the user from the database and applies role checks.

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
  "role": "ANALYST"
}
```

- `GET /users/:id`
  - Access: `ADMIN`
  - Purpose: Get one user

- `PATCH /users/:id`
  - Access: `ADMIN`
  - Purpose: Update user fields

- `DELETE /users/:id`
  - Access: `ADMIN`
  - Purpose: Remove a user

## Financial records

- `GET /financial-records`
  - Access: `VIEWER`, `ANALYST`, `ADMIN`
  - Query params: `type`, `category`, `userId`
  - Purpose: List financial records

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

- `DELETE /financial-records/:id`
  - Access: `ADMIN`
  - Purpose: Delete a record

## Dashboard summary

- `GET /dashboard/summary`
  - Access: `VIEWER`, `ANALYST`, `ADMIN`
  - Response:
```json
{
  "totalIncome": 50000,
  "totalExpense": 18000,
  "netAmount": 32000
}
```

- `GET /dashboard/trends`
  - Access: `VIEWER`, `ANALYST`, `ADMIN`
  - Purpose: Return monthly income vs expense trend

- `GET /dashboard/category-breakdown`
  - Access: `VIEWER`, `ANALYST`, `ADMIN`
  - Purpose: Return totals grouped by type and category
