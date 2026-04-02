# Project folder structure

```text
finance-dashboard-backend/
|-- prisma/
|   `-- schema.prisma
|-- src/
|   |-- config/
|   |   |-- env.js
|   |   `-- prisma.js
|   |-- controllers/
|   |   |-- dashboardController.js
|   |   |-- financialRecordController.js
|   |   `-- userController.js
|   |-- middlewares/
|   |   |-- authMiddleware.js
|   |   |-- authorize.js
|   |   |-- errorHandler.js
|   |   |-- notFound.js
|   |   `-- validate.js
|   |-- routes/
|   |   |-- dashboardRoutes.js
|   |   |-- financialRecordRoutes.js
|   |   |-- index.js
|   |   `-- userRoutes.js
|   |-- services/
|   |   |-- dashboardService.js
|   |   |-- financialRecordService.js
|   |   `-- userService.js
|   |-- utils/
|   |   |-- appError.js
|   |   `-- asyncHandler.js
|   |-- app.js
|   `-- server.js
|-- docs/
|   |-- api-design.md
|   |-- folder-structure.md
|   `-- implementation-plan.md
|-- .env.example
|-- .gitignore
`-- package.json
```

## Layer responsibilities

- `routes`: Defines endpoints and attaches validation and role checks.
- `controllers`: Handles request and response flow only.
- `services`: Contains database and business logic.
- `middlewares`: Shared request guards like auth, validation, and errors.
- `config`: Central place for environment and Prisma setup.
- `utils`: Small reusable helpers.
