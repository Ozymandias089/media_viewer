import { FileType } from "src/utils/types";

export class FileItemDto {
    name: string;
    type: FileType;
    url: string;
    thumbnailUrl?: string;
    
    constructor(name: string, type: FileType, url: string, thumbnailUrl?: string) {
        this.name = name;
        this.type = type;
        this.url = url;
        this.thumbnailUrl = thumbnailUrl;
    }
}