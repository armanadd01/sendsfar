// Common types used across the application

// Transfer Types
export interface Transfer {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  sender: User;
  recipients: User[];
  createdAt: string;
  expiresAt: string;
  status: TransferStatus;
  downloadCount: number;
  isPasswordProtected: boolean;
  message?: string;
}

export type TransferStatus = 'pending' | 'downloaded' | 'expired' | 'deleted';

export interface TransferHistory extends Transfer {
  lastActivity: string;
  activityType: ActivityType;
}

export type ActivityType = 'sent' | 'received' | 'downloaded' | 'forwarded' | 'deleted';

// Review Types
export interface Review {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: ReviewStatus;
  author: User;
  collaborators: User[];
  feedback: Feedback[];
  files: ReviewFile[];
}

export type ReviewStatus = 'draft' | 'active' | 'completed';

export interface ReviewFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  url: string;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  attachments?: ReviewFile[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
