# Local MySQL Setup

1. Duplicate the environment template:
   ```bash
   cp .env.example .env
   ```
2. Launch the database stack (MySQL + Adminer):
   ```bash
   npm run docker:db
   ```
   Wait until the `logistics_mysql` container reports `ready for connections`.
3. Apply the TypeORM migrations:
   ```bash
   npm run db:prepare
   ```
4. (Optional) Inspect data via Adminer at http://localhost:8080 using:
   - System: MySQL
   - Server: mysql
   - Username: logistics
   - Password: logistics
   - Database: logistics
5. Start the NestJS API in watch mode:
   ```bash
   npm run start:dev
   ```
6. To tear everything down:
   ```bash
   npm run docker:db:down
   ```
