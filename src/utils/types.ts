export enum FileType {
    Directory = 'directory',
    Image = 'image',
    Video = 'video',
    Other = 'other',
  }
  
  export interface FileItem {
    name: string;
    type: FileType;
    url: string;
  }