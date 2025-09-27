# Logistics Modular Monolith Architecture

- **Framework**: NestJS (TypeScript) with modular monolith layout (`apps/api`, `libs/*`).
- **Hexagonal layering**: controllers -> application services -> domain -> infrastructure adapters.
- **Persistence**: MySQL 8 via TypeORM (`autoLoadEntities`, migrations under `apps/api/src/database/migrations`).
- **Configuration**: `@nestjs/config` with typed schema (`apps/api/src/config`).
- **Observability**: to be integrated with OpenTelemetry; health checks exposed via `/health`.
- **Testing**: Jest for unit/e2e, Husky pre-commit runs lint and tests.
