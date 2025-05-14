import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
