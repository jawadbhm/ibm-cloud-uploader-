
export enum UploadStatus {
  PENDING = 'Pending',
  UPLOADING = 'Uploading',
  COMPLETED = 'Completed',
  FAILED = 'Failed'
}

export type Bucket = 'dev-uploads' | 'prod-reports' | 'archive-logs';

export interface UploadItem {
  id: string;
  file: File;
  bucket: Bucket;
  status: UploadStatus;
  progress: number;
  completedAt: Date | null;
}
