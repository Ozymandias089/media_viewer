import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MoveFileRequestDto } from "./dto/move-file-request.dto";
import { promises as fs, Stats } from 'fs';
import * as path from 'path';
import { getFullPath, validatePath } from "src/utils/path-utils";

@Injectable()
export class FileManagerService {
    private readonly contentRootPath: string = path.join(__dirname, '../../../content');

    async uploadFiles(files: Express.Multer.File[], targetPath: string): Promise<void> { // TODO: Set webkitdirectory
        validatePath(targetPath);

        for (const file of files) {
            const relativeFilePath: string = file.originalname.split(path.sep).join(path.posix.sep);  // e.g. paris/1.jpg
            const targetFilePath: string = path.join(this.contentRootPath, targetPath, relativeFilePath);
    
            // 디렉토리 생성
            const dir: string = path.dirname(targetFilePath);
            await fs.mkdir(dir, { recursive: true });
    
            // 파일 이동
            await fs.rename(file.path, targetFilePath);
        }
    }

    async moveFile(moveFileRequestDto: MoveFileRequestDto): Promise<void> {
        const { sourcePath, targetPath } = moveFileRequestDto;
        // 경로 검증
        validatePath(sourcePath);
        validatePath(targetPath);

        const sourceFullPath: string = path.join(this.contentRootPath, sourcePath);
        const targetFullPath: string = path.join(this.contentRootPath, targetPath);

        // 대상 경로가 폴더인지 파일인지 확인하고 적절하게 처리
        const sourceStat: Stats = await fs.stat(sourceFullPath);
        if (sourceStat.isDirectory()) {
            await this.moveFolder(sourceFullPath, targetFullPath);
        } else if (sourceStat.isFile()) {
            await this.moveFileSingle(sourceFullPath, targetFullPath);
        } else {
            throw new HttpException('Source is neither a file nor a folder', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteFile(targetPath: string): Promise<void> {
        validatePath(targetPath);

    const fullPath = getFullPath(targetPath);

    try {
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
            await this.deleteDirectory(fullPath);
        } else if (stats.isFile()) {
            await fs.unlink(fullPath);
        } else {
            throw new HttpException('Target is neither a file nor folder', HttpStatus.BAD_REQUEST);
        }
    } catch (error) {
        throw new HttpException(`Failed to delete: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    // 파일 이동
    private async moveFileSingle(sourceFullPath: string, targetFullPath: string): Promise<void> {
        if (await this.pathExists(targetFullPath)) {
            throw new HttpException('Target path already Exists', HttpStatus.BAD_REQUEST);
        }
    
        try {
            await fs.rename(sourceFullPath, targetFullPath);
        } catch (error) {
            throw new HttpException(`Failed to move file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async pathExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    // 폴더 이동 (재귀적으로 파일/폴더 이동)
    private async moveFolder(sourceFullPath: string, targetFullPath: string): Promise<void> {
        try {
            try {
                await fs.access(targetFullPath);
                throw new HttpException('Target path already exists', HttpStatus.BAD_REQUEST);
            } catch (err) {
                // 대상 폴더가 없으면 생성
                await fs.mkdir(targetFullPath, { recursive: true });
            }

            const files: string[] = await fs.readdir(sourceFullPath);
            for (const file of files) {
                const currentSourcePath = path.join(sourceFullPath, file);
                const currentTargetPath = path.join(targetFullPath, file);
                const stats: Stats = await fs.stat(currentSourcePath);

                if (stats.isDirectory()) {
                    // 재귀 호출
                    await this.moveFolder(currentSourcePath, currentTargetPath);
                } else {
                    // 파일 이동
                    await this.moveFileSingle(currentSourcePath, currentTargetPath);
                }
            }

            // 이동 완료 후 원본 폴더 삭제
            await fs.rm(sourceFullPath, {recursive: true, force: true});
        } catch (error) {
            throw new HttpException(`Failed to move folder: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async deleteDirectory(directoryPath: string) {
        try {
            const entries: string[] = await fs.readdir(directoryPath);

        for (const entry of entries) {
            const entryPath: string = path.join(directoryPath, entry);
            const stats: Stats = await fs.stat(entryPath);

            if (stats.isDirectory()) {
                await this.deleteDirectory(entryPath);
            } else {
                await fs.unlink(entryPath);  // 파일 삭제
            }
        }

        await fs.rmdir(directoryPath);  // 폴더 삭제
        } catch (error) {
            throw new HttpException(`Failed to delete folder: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}