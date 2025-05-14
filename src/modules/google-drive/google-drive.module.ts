import { Module } from '@nestjs/common';
import { GoogleDriveService } from './google-drive.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 55000,
      maxRedirects: 1,
    }),
  ],
  providers: [GoogleDriveService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
