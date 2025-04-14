import { Body, Controller, Delete, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ThumbnailService } from "./thumbnail.service";

@Controller()
export class ThumbnailController {
    constructor(private readonly thumbnailService: ThumbnailService) {}
}