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
  - Access: `ANALYST`, `ADMIN`
  - Response:
```json
{
  "totalIncome": 50000,
  "totalExpense": 18000,
  "netAmount": 32000
}
```

- `GET /dashboard/trends`
  - Access: `ANALYST`, `ADMIN`
  - Purpose: Return monthly income vs expense trend

- `GET /dashboard/category-breakdown`
  - Access: `ANALYST`, `ADMIN`
  - Purpose: Return totals grouped by type and category
