//TODO: 과연 이게 여기 있는게 맞을까?
// 그리고 DTO는 어디에 만들지?

export enum FileType {
  Directory = 'directory',
  Image = 'image',
  Video = 'video',
  Other = 'other',
}

export enum Extension {
  Jpg = '.jpg',
  Jpeg = '.jpeg',
  Png = '.png',
  Gif = '.gif',
  Webp = '.webp',
  Mp4 = '.mp4',
  Mov = '.mov',
  Avi = '.avi',
  Webm = '.webm',
}

export interface FileItem {
  name: string;
  type: FileType;
  url: string;
  thumbnailUrl?: string;
}

export interface Breadcrumb {
  name: string;
  url: string;
}