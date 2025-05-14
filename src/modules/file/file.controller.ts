import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadFilesDto } from './dto/upload-files.dto';
import { FileService } from './file.service';
import { Page, PageableParams } from '@app/common/types';
import { FileListDto } from './dto/file-list.dto';
import { ApiOkResponsePaginated } from '@app/common/decorators/paged-response.decorator';

@ApiTags('Files')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Uploading files via links' })
  @HttpCode(HttpStatus.OK)
  async uploadFiles(@Body() dto: UploadFilesDto): Promise<any> {
    return this.fileService.uploadFiles(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiOkResponsePaginated(FileListDto)
  @HttpCode(HttpStatus.OK)
  async getAllFiles(
    @Query() pageable: PageableParams,
  ): Promise<Page<FileListDto>> {
    return this.fileService.getAllFiles(pageable);
  }
}
