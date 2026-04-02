# Step-by-step implementation plan

1. Initialize the project
- Create `package.json`
- Install Express, Prisma, and validation utilities
- Add `.env.example` for local setup

2. Configure infrastructure
- Set up `src/config/env.js` for environment variables
- Set up `src/config/prisma.js` for a shared Prisma client
- Create `src/app.js` and `src/server.js`

3. Design the database schema
- Create `Role` and `RecordType` enums
- Create `User` and `FinancialRecord` models in Prisma
- Add indexes for common dashboard filters

4. Add shared request handling
- Create async error wrapper
- Create centralized error handler and 404 handler
- Add request validation middleware using Zod

5. Implement access control
- Create auth middleware that reads `x-user-id`
- Load the current user from SQLite through Prisma
- Add role-based `authorize` middleware

6. Build user management
- Create service methods for list, create, get, update, and delete
- Expose those methods through thin controllers and routes
- Restrict user management endpoints to admins

7. Build financial record APIs
- Add CRUD services and controllers for income and expense data
- Support simple filters for type, category, and user
- Allow analysts and admins to write data

8. Build dashboard APIs
- Add summary totals API
- Add monthly trend API
- Add category breakdown API
- Keep aggregation logic inside the service layer

9. Verify locally
- Run Prisma generate and migrations
- Seed a few users and financial records
- Test each route with Postman or Bruno
- Confirm role rules and validation errors behave correctly

10. Next production improvements
- Replace `x-user-id` header auth with JWT or session auth
- Add pagination for record listing
- Add logging, rate limiting, and tests
