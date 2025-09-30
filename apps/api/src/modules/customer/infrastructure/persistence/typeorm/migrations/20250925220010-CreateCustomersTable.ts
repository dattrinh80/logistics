import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomersTable20250925220010 implements MigrationInterface {
  name = 'CreateCustomersTable20250925220010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'code', type: 'varchar', length: '64', isNullable: false },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'contact_email', type: 'varchar', length: '255', isNullable: false },
          { name: 'active', type: 'tinyint', width: 1, isNullable: false, default: '1' },
          { name: 'webhook_url', type: 'varchar', length: '255', isNullable: true },
          {
            name: 'created_at',
            type: 'datetime(6)',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'datetime(6)',
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)',
          },
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
  }
}
