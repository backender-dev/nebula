import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsUrl } from 'class-validator';

export class UploadFilesDto {
  @ApiProperty({
    format: 'url',
    isArray: true,
    example: [
      'https://images.prom.ua/4482758983_w0_h430_abstraktni-kartini-velike.jpg',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  urls: string[];
}
