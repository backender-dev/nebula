import { UploadFileActivity } from './activities/upload-file.activity';
import { Module } from '@nestjs/common';
import { GoogleDriveModule } from '../google-drive/google-drive.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [GoogleDriveModule, FileModule],
  providers: [UploadFileActivity],
  exports: [],
})
export class TemporalModule {}
