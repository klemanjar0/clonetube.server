import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ControllerName } from '../../utils/enums';
import { FileService } from './file.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller(ControllerName.File)
export class FileController {
  constructor(private readonly fileService: FileService) {
    console.log(fileService);
  }

  @Post('uploadAvatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  uploadFile(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }
}
