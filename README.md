# Finance Dashboard Backend

This project focuses on backend design, access control, and data handling rather than production infrastructure.

It is a backend system for a finance dashboard that enables users to manage financial records and view analytical insights based on their roles.

The system is designed with a focus on clean architecture, role-based access control (RBAC), and efficient data handling. It exposes REST APIs that support secure authentication, structured data operations, and dashboard-level analytics.

## Features

- JWT authentication with access token and basic refresh token support
- Role-based access control for `VIEWER`, `ANALYST`, and `ADMIN`
- User management APIs
- Financial record CRUD APIs
- Paginated record listing with filters
- Dashboard summary and analytics APIs
- Zod request validation
- Global error handling
- Simple in-memory rate limiting

## Tech Stack

- Backend: Node.js, Express.js
- Database: SQLite (direct integration)
- ORM: Prisma (design reference only)
- Authentication: JWT (JSON Web Tokens)
- Security: bcrypt (password hashing), rate limiting
- Architecture: MVC + Service Layer

## Project Structure

```text
prisma/
  schema.prisma
  schema.sql
src/
  config/
  controllers/
  middlewares/
  routes/
  services/
  utils/
  app.js
  server.js
docs/
  api-design.md
  folder-structure.md
  implementation-plan.md
```

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Copy environment variables

```bash
cp .env.example .env
```

3. Generate the Prisma client

```bash
npm run prisma:generate
```

4. Create the SQLite database directly

```bash
python -c "import sqlite3, pathlib; conn = sqlite3.connect('prisma/app.db'); conn.execute('PRAGMA journal_mode=MEMORY;'); conn.execute('PRAGMA synchronous=OFF;'); conn.executescript(pathlib.Path('prisma/schema.sql').read_text()); conn.commit(); conn.close()"
```

5. Start the server

```bash
npm run dev
```

Server runs on `http://localhost:4000` by default.

## Environment Variables

Example values are already included in [.env.example]

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="file:./app.db"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_SECRET="super-secret-refresh-key"
JWT_REFRESH_EXPIRES_IN="7d"
```

## Authentication

Public auth endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

Protected routes require:

```http
Authorization: Bearer <access-token>
```

Passwords are hashed using `bcryptjs`.

## Roles

- `VIEWER`: read-only access to records
- `ANALYST`: viewer access plus dashboard analytics and record creation/update
- `ADMIN`: full access including user management and record deletion

## Main API Areas

- `/api/auth`
- `/api/users`
- `/api/records`
- `/api/financial-records`
- `/api/dashboard`

The paginated records endpoint supports:

- `page` default `1`
- `limit` default `10`
- `type`
- `category`
- `userId`
- `dateFrom`
- `dateTo`

Example response:

```json
{
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

## Middleware Included

- Authentication middleware for Bearer tokens
- Role authorization middleware
- Zod validation middleware
- Global error handler
- 404 handler
- In-memory rate limiter: `100` requests per `15` minutes per IP

## Assumptions

- Single-user context (no multi-tenant support)
- Single currency system
- JWT-based authentication only
- No external integrations

## Design Decisions

- Used SQLite for simplicity and quick setup
- Retained Prisma schema for structured data modeling
- Implemented RBAC using middleware for scalability
- Used service layer to separate business logic from controllers
- Applied pagination at database level for performance

## Notes

- Health check endpoint: `GET /health`
- API routes are mounted under `/api`
- SQLite is used for local simplicity
- Dashboard endpoints are implemented with role-based access control. To access them, the user must have ANALYST or ADMIN role.
- The project also keeps a Prisma schema, but local DB creation currently uses [prisma/schema.sql] because Prisma schema-engine commands have been unreliable in this environment

## Documentation

- [API design](docs/api-design.md)
- [Folder structure](docs/folder-structure.md)
- [Implementation plan](docs/implementation-plan.md)

## Author
Prajwal P Bailkeri
