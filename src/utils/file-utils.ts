import { Extension, FileType } from "./types";

const extensionToTypeMap: Record<Extension, FileType> = {
  [Extension.Jpg]: FileType.Image,
  [Extension.Jpeg]: FileType.Image,
  [Extension.Png]: FileType.Image,
  [Extension.Gif]: FileType.Image,
  [Extension.Webp]: FileType.Image,
  [Extension.Mp4]: FileType.Video,
  [Extension.Mov]: FileType.Video,
  [Extension.Avi]: FileType.Video,
  [Extension.Webm]: FileType.Video,
};

export function getFileType(ext: string): FileType {
  const normalized = ext.toLowerCase() as Extension;
  return extensionToTypeMap[normalized] || FileType.Other;
}