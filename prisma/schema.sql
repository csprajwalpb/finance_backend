PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "User" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'VIEWER' CHECK ("role" IN ('VIEWER', 'ANALYST', 'ADMIN')),
  "status" TEXT NOT NULL DEFAULT 'ACTIVE' CHECK ("status" IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "FinancialRecord" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "userId" INTEGER NOT NULL,
  "type" TEXT NOT NULL CHECK ("type" IN ('INCOME', 'EXPENSE')),
  "category" TEXT NOT NULL,
  "amount" DECIMAL NOT NULL,
  "notes" TEXT,
  "recordDate" DATETIME NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FinancialRecord_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role");
CREATE INDEX IF NOT EXISTS "User_status_idx" ON "User"("status");
CREATE INDEX IF NOT EXISTS "FinancialRecord_userId_idx" ON "FinancialRecord"("userId");
CREATE INDEX IF NOT EXISTS "FinancialRecord_type_idx" ON "FinancialRecord"("type");
CREATE INDEX IF NOT EXISTS "FinancialRecord_category_idx" ON "FinancialRecord"("category");
CREATE INDEX IF NOT EXISTS "FinancialRecord_recordDate_idx" ON "FinancialRecord"("recordDate");
