import { Transfer } from '../types';

// Generate 500 mock sent transfers
const generateMockSentTransfers = (): Transfer[] => {
  const fileTypes = ['pdf', 'docx', 'xlsx', 'pptx', 'zip', 'jpg', 'png', 'mp4', 'mp3', 'txt'];
  const statuses: Array<Transfer['status']> = ['pending', 'downloaded', 'expired', 'deleted'];
  
  return Array.from({ length: 500 }, (_, index) => {
    const id = `st-${index + 1000}`;
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const fileSize = Math.floor(Math.random() * 1000000000) + 1000000; // 1MB to 1GB
    const createdDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const expiresDate = new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const downloadCount = Math.floor(Math.random() * 10);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id,
      title: `Project Files ${index + 1}`,
      fileName: `project-file-${index + 1}.${fileType}`,
      fileSize,
      fileType,
      sender: {
        id: 'user-1',
        name: 'Current User',
        email: 'user@example.com',
        avatar: '/avatars/user-1.png'
      },
      recipients: [
        {
          id: `recipient-${index % 20 + 1}`,
          name: `Recipient ${index % 20 + 1}`,
          email: `recipient${index % 20 + 1}@example.com`,
          avatar: `/avatars/recipient-${index % 20 + 1}.png`
        },
        {
          id: `recipient-${(index + 5) % 20 + 1}`,
          name: `Recipient ${(index + 5) % 20 + 1}`,
          email: `recipient${(index + 5) % 20 + 1}@example.com`,
          avatar: `/avatars/recipient-${(index + 5) % 20 + 1}.png`
        }
      ],
      createdAt: createdDate.toISOString(),
      expiresAt: expiresDate.toISOString(),
      status,
      downloadCount,
      isPasswordProtected: Math.random() > 0.7,
      message: Math.random() > 0.5 ? `Here are the project files for review. Please check and provide feedback.` : undefined
    };
  });
};

export const sentTransfers = generateMockSentTransfers();
