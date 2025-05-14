import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../entities/file.entity';
import { UUID } from '@app/common/types';
import { IsDateString, IsString, IsUrl, IsUUID } from 'class-validator';

export class StoreFileDto implements FileEntity {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id: UUID;

  @ApiProperty()
  @IsUrl()
  originUrl: string;

  @ApiProperty()
  @IsUrl()
  driveUrl: string;

  @ApiProperty()
  @IsString()
  driveId: string;

  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsString()
  mimeType: string;

  @ApiProperty({ format: 'date-time' })
  @IsDateString()
  uploadedAt: Date;
}
