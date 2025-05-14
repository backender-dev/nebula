import { UUID } from '@app/common/types';
import { TABLE_FILES } from '@app/database/tables';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLE_FILES)
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'origin_url',
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  originUrl: string;

  @Column({
    name: 'drive_url',
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  driveUrl: string;

  @Column({
    name: 'drive_id',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  driveId: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  fileName: string;

  @Column({
    name: 'mime_type',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  mimeType: string;

  @CreateDateColumn({
    name: 'uploaded_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploadedAt: Date;
}
