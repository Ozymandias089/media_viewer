import { Module } from "@nestjs/common";
import { ThumbnailController } from "./thumbnail.controller";

@Module({
    controllers: [ThumbnailController],
    providers: [],
})
export class ThumbnailModule {}