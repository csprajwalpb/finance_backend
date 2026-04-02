# Finance Dashboard Backend

A minimal and beginner-friendly backend for a finance dashboard using Node.js, Express, SQLite, and Prisma.

## Quick start

1. Install dependencies
```bash
npm install
```

2. Copy environment variables
```bash
cp .env.example .env
```

3. The default SQLite database file is already configured in `.env`

4. Generate Prisma client
```bash
npm run prisma:generate
```

5. Create the SQLite database directly
```bash
python -c "import sqlite3, pathlib; conn = sqlite3.connect('prisma/dev.db'); conn.execute('PRAGMA journal_mode=MEMORY;'); conn.execute('PRAGMA synchronous=OFF;'); conn.executescript(pathlib.Path('prisma/schema.sql').read_text()); conn.commit(); conn.close()"
```

6. Start the server
```bash
npm run dev
```

## Notes

- Health check: `GET /health`
- API base path: `/api`
- Add `x-user-id` header to test protected routes
- Local SQLite setup uses [prisma/schema.sql](D:\Coding\zorvyn\prisma\schema.sql) because Prisma's schema engine is failing in this environment
- SQLite is great for local development and learning; PostgreSQL is still a better production choice for multi-user finance systems
- Full route details are in `docs/api-design.md`
