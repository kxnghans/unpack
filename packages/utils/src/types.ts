export type UploadStatus = 'Pending' | 'Uploaded' | 'Failed';

export interface DocumentType {
  id: string;
  name: string;
  isCustom?: boolean;
}

export interface UserDocument {
  id: string; // Add id here for easier state management
  type: DocumentType;
  status: UploadStatus;
  uploadedAt?: Date;
  customName?: string;
  uri?: string; // Add uri to store the file path
}

export interface SavingsGoal {
    id: string;
    name: string;
    currentAmount?: number;
    totalAmount?: number;
    status: 'In Progress' | 'Completed';
    completedDate?: Date;
    imageUrl?: string;
}
