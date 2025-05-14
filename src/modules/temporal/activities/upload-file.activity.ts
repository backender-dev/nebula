import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';
import { GoogleDriveService } from '@app/modules/google-drive/google-drive.service';
import { UploadFileResultDto } from '@app/modules/google-drive/dto/upload-file-result.dto';
import { FileService } from '@app/modules/file/file.service';
import { UUID } from '@app/common/types';

@Injectable()
@Activities()
export class UploadFileActivity {
  constructor(
    private readonly googleDriveService: GoogleDriveService,
    private readonly fileService: FileService,
  ) {}

  @Activity()
  async uploadFileFromUrl(url: string): Promise<UploadFileResultDto> {
    return await this.googleDriveService.uploadFileFromUrl(url);
  }

  @Activity()
  async storeFile(
    originUrl: string,
    fileId: UUID,
    payload: UploadFileResultDto,
  ): Promise<void> {
    const { driveId, fileName, mimeType, driveUrl, uploadedAt } = payload;
    await this.fileService.storeFile({
      id: fileId,
      driveId,
      fileName,
      mimeType,
      driveUrl,
      uploadedAt,
      originUrl,
    });
  }
}
