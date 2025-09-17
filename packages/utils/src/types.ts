/**
 * Represents the status of a document upload.
 */
export type UploadStatus = 'Pending' | 'Uploaded' | 'Failed';

/**
 * Represents a type of document that can be uploaded.
 */
export interface DocumentType {
  id: string;
  name: string;
  isCustom?: boolean;
}

/**
 * Represents a document that has been uploaded by the user.
 */
export interface UserDocument {
  id: string; // Add id here for easier state management
  type: DocumentType;
  status: UploadStatus;
  uploadedAt?: Date;
  customName?: string;
  uri?: string; // Add uri to store the file path
}

/**
 * Represents a savings goal.
 */
export interface SavingsGoal {
    id: string;
    name: string;
    currentAmount?: number;
    totalAmount?: number;
    status: 'In Progress' | 'Completed';
    completedDate?: Date;
    imageUrl?: string;
}
