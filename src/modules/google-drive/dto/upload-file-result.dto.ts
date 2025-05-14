import { ApiResponseProperty } from '@nestjs/swagger';

export class UploadFileResultDto {
  @ApiResponseProperty()
  driveId: string;

  @ApiResponseProperty()
  fileName: string;

  @ApiResponseProperty()
  mimeType: string;

  @ApiResponseProperty()
  driveUrl: string;

  @ApiResponseProperty()
  uploadedAt: Date;
}
