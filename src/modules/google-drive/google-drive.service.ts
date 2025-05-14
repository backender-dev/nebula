import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import { join } from 'path';
import { Readable } from 'stream';
import { UploadFileResultDto } from './dto/upload-file-result.dto';

@Injectable()
export class GoogleDriveService implements OnModuleInit {
  private logger = new Logger(GoogleDriveService.name);
  private driveClient: drive_v3.Drive;

  constructor(private http: HttpService) {}

  async onModuleInit() {
    this.driveClient = await this.createDriveClient();
  }

  private async createDriveClient(): Promise<drive_v3.Drive> {
    const auth = new google.auth.GoogleAuth({
      keyFile: join(__dirname, '../../../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return google.drive({ version: 'v3', auth });
  }

  private getFileNameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return decodeURIComponent(
        urlObj.pathname.split('/').pop() || 'unnamed-file',
      );
    } catch {
      return 'unnamed-file';
    }
  }

  private async downloadFileFromUrl(
    url: string,
  ): Promise<{ stream: Readable; mimeType: string }> {
    const response = await this.http.axiosRef.get(url, {
      responseType: 'stream',
    });
    const mimeType = response.headers['content-type'];
    return { stream: response.data as Readable, mimeType };
  }

  private async createDriveFile(
    fileName: string,
    mimeType: string,
    stream: Readable,
  ): Promise<string> {
    const { data } = await this.driveClient.files.create({
      requestBody: { name: fileName, mimeType },
      media: { mimeType, body: stream },
      uploadType: 'resumable',
    });
    return data.id;
  }

  private async makeFilePublic(fileId: string): Promise<void> {
    await this.driveClient.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  }

  async uploadFileFromUrl(url: string): Promise<UploadFileResultDto> {
    try {
      const { stream, mimeType } = await this.downloadFileFromUrl(url);

      const fileName = this.getFileNameFromUrl(url);
      const driveId = await this.createDriveFile(fileName, mimeType, stream);

      await this.makeFilePublic(driveId);

      const { data: file } = await this.driveClient.files.get({
        fileId: driveId,
        fields: 'webViewLink',
      });

      return {
        driveId,
        fileName,
        mimeType,
        driveUrl: file.webViewLink,
        uploadedAt: new Date(),
      };
    } catch (error) {
      this.logger.error(
        `Failed to upload file from URL ${url}:`,
        error.message,
      );
      throw new Error('Google Drive file upload failed');
    }
  }
}
