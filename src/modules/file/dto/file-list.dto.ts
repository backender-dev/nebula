import { ApiResponseProperty } from '@nestjs/swagger';
import { FileEntity } from '../entities/file.entity';
import { UUID } from '@app/common/types';

export class FileListDto implements FileEntity {
  @ApiResponseProperty({ format: 'uuid' })
  id: UUID;

  @ApiResponseProperty({
    format: 'url',
    example:
      'https://images.prom.ua/4482758983_w0_h430_abstraktni-kartini-velike.jpg',
  })
  originUrl: string;

  @ApiResponseProperty({
    format: 'url',
    example:
      'https://drive.google.com/file/d/1ZXcKe22_CC-JLLHs2jHEnZWIF_ND33OI/view?usp=drivesdk',
  })
  driveUrl: string;

  @ApiResponseProperty()
  driveId: string;

  @ApiResponseProperty()
  fileName: string;

  @ApiResponseProperty()
  mimeType: string;

  @ApiResponseProperty({ format: 'date-time' })
  uploadedAt: Date;
}
