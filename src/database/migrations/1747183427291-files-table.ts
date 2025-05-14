import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FilesTable1747183427291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'origin_url',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'drive_url',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'drive_id',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'file_name',
            type: 'varchar',
            length: '256',
            isNullable: false,
          },
          {
            name: 'mime_type',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
          {
            name: 'uploaded_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
