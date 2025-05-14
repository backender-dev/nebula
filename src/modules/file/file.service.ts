import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { UploadFilesDto } from './dto/upload-files.dto';
import { InjectTemporalClient } from 'nestjs-temporal';
import { WorkflowClient } from '@temporalio/client';
import { uploadFileWorkflow } from '../temporal/workflows';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { StoreFileDto } from './dto/store-file.dto';
import { Page, PageableParams } from '@app/common/types';
import { FileListDto } from './dto/file-list.dto';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
    private readonly configService: ConfigService,
  ) {}

  async uploadFiles(dto: UploadFilesDto): Promise<any> {
    const { urls } = dto;
    const queued = [];

    for (const url of urls) {
      const fileId = uuidv4();
      await this.temporalClient.start(uploadFileWorkflow, {
        args: [url, fileId],
        taskQueue: this.configService.get('TEMPORAL_QUEUE'),
        workflowId: fileId,
      });

      queued.push({ url, fileId });
    }

    return {
      status: 'queued',
      message: `${queued.length} file(s) scheduled for upload`,
      items: queued,
    };
  }

  async storeFile(dto: StoreFileDto): Promise<FileEntity> {
    const file = this.fileRepository.create(dto);

    return await this.fileRepository.save(file);
  }

  async getAllFiles(pageable: PageableParams): Promise<Page<FileListDto>> {
    const { offset, limit } = pageable;

    const [result, total] = await this.fileRepository.findAndCount({
      order: { uploadedAt: 'DESC' },
      skip: offset,
      take: limit,
    });

    return { total, list: result };
  }
}
