# Finance Dashboard Backend

A minimal and beginner-friendly backend for a finance dashboard using Node.js, Express, PostgreSQL, and Prisma.

## Quick start

1. Install dependencies
```bash
npm install
```

2. Copy environment variables
```bash
cp .env.example .env
```

3. Update your PostgreSQL connection string in `.env`

4. Generate Prisma client
```bash
npm run prisma:generate
```

5. Run database migration
```bash
npm run prisma:migrate -- --name init
```

6. Start the server
```bash
npm run dev
```

## Notes

- Health check: `GET /health`
- API base path: `/api`
- Add `x-user-id` header to test protected routes
- Full route details are in `docs/api-design.md`
