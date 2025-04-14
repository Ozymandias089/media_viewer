export class MoveFileRequestDto {
    sourcePath: string;
    targetPath: string;

    constructor(sourcePath: string, targetPath: string) {
        this.sourcePath = sourcePath;
        this.targetPath = targetPath;
    }
}