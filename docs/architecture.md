# Logistics Modular Monolith Architecture

- **Framework**: NestJS (TypeScript) with modular monolith layout (`apps/api`, `libs/*`).
- **Hexagonal layering**: controllers -> application services -> domain -> infrastructure adapters.
- **Persistence**: MySQL 8 via TypeORM (`autoLoadEntities`, migrations under `apps/api/src/infrastructure/database/migrations` and module-specific paths like `apps/api/src/modules/**/infrastructure/persistence/typeorm/migrations`).
- **Configuration**: `@nestjs/config` with typed schema (`apps/api/src/config`).
- **Observability**: to be integrated with OpenTelemetry; health checks exposed via `/health`.
- **Testing**: Jest for unit/e2e, Husky pre-commit runs lint and tests.
# Architecture
apps/api/src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root module
├── config/                    # Environment and configuration
│   ├── database.config.ts     # Database configuration
│   └── app.config.ts          # Application configuration
├── infrastructure/            # Cross-cutting adapters
│   ├── observability/         # Logging, tracing
│   ├── database/              # TypeORM data-source, migrations
│   └── messaging/             # Message queues (placeholder)
├── modules/                   # Domain modules
│   ├── carrier/               # Carrier management
│   │   ├── api/               # Controllers, DTOs, filters
│   │   ├── application/       # Use cases, services
│   │   ├── domain/            # Entities, value objects, events
│   │   ├── infrastructure/    # Repositories, adapters
│   │   └── tests/             # Unit and integration tests
│   ├── customer/              # Customer management
│   └── pricing/               # Pricing (future sprint)
└── shared/                    # Shared components
    ├── kernel/                # Base abstractions
    ├── utils/                 # Helper libraries
    └── dto/                   # Common DTOs, pagination
