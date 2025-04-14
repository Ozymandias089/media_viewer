import { Injectable } from "@nestjs/common";
import { MoveFileRequestDto } from "./dto/move-file-request.dto";
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FileManagerService {
    private readonly baseUploadPath = path.join(__dirname, '../../../content');

    async uploadFiles(files: Express.Multer.File[], targetPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async moveFile(moveFileRequestDto: MoveFileRequestDto): Promise<void> {
        const { sourcePath, targetPath } = moveFileRequestDto;
        throw new Error("Method not implemented.");
    }

    async deleteFile(targetPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}