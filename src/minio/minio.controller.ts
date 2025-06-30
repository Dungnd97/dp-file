import { Controller, Get, Query, Res, BadRequestException, InternalServerErrorException, Param } from '@nestjs/common'
import { Response } from 'express'
import { MinioService } from './minio.service'
import { lookup } from 'mime-types'
import * as path from 'path'

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Get('buckets')
  async getBuckets() {
    return this.minioService.listAllBuckets()
  }

  @Get('file')
  async getFileFromBucket(@Query('bucket') bucket: string, @Query('fileName') fileName: string, @Res() res: Response) {
    if (!bucket || !fileName) {
      throw new BadRequestException('Thiếu bucket hoặc fileName')
    }

    try {
      const fileStream = await this.minioService.getFile(bucket, fileName)

      const baseFileName = path.basename(fileName)
      const mimeType: string = lookup(baseFileName) || 'application/octet-stream'
      // inline = hiển thị | attachment = tải về
      res.setHeader('Content-Type', mimeType)
      res.setHeader('Content-Disposition', `inline; filename="${baseFileName}"`)
      res.setHeader('Cache-Control', 'public, max-age=86400')

      return fileStream.pipe(res)
    } catch (err) {
      console.error('❌ Không thể get file:', err?.message || err)
      throw new InternalServerErrorException('Không thể lấy file từ MinIO')
    }
  }
}
