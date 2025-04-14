import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileManagerService } from "./file-manager.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MoveFileRequestDto } from "./dto/move-file-request.dto";

@Controller()
export class FileManagerController {
    constructor(private readonly fileManagerService: FileManagerService) {}

    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@UploadedFiles() files: Express.Multer.File[] , @Body('targetPath') targetPath: string): Promise<void> {
        return await this.fileManagerService.uploadFiles(files, targetPath);
    }

    @Post('move')
    async moveFiles(@Body() moveFileRequestDto: MoveFileRequestDto): Promise<void> {
        return await this.fileManagerService.moveFile(moveFileRequestDto);
    }

    @Delete()
    async deleteFiles(@Body() targetPath: string ): Promise<void> {
        return await this.fileManagerService.deleteFile(targetPath);
    }
}