import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitSchema20250925220000 implements MigrationInterface {
  name = 'InitSchema20250925220000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'carriers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'code', type: 'varchar', length: '64', isNullable: false },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'active', type: 'boolean', isNullable: false, default: 'true' },
          { name: 'capabilities', type: 'jsonb', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
        uniques: [
          {
            name: 'UQ_carriers_code',
            columnNames: ['code'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'code', type: 'varchar', length: '64', isNullable: false },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'contact_email', type: 'varchar', length: '255', isNullable: false },
          { name: 'active', type: 'boolean', isNullable: false, default: 'true' },
          { name: 'webhook_url', type: 'varchar', length: '255', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
        uniques: [
          {
            name: 'UQ_customers_code',
            columnNames: ['code'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
    await queryRunner.dropTable('carriers');
  }
}
