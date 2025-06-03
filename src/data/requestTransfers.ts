import { Transfer } from '../types';

// Generate 500 mock received transfers
const generateMockRequestTransfers  = (): Transfer[] => {
  const fileTypes = ['pdf', 'docx', 'xlsx', 'pptx', 'zip', 'jpg', 'png', 'mp4', 'mp3', 'txt'];
  const statuses: Array<Transfer['status']> = ['pending', 'downloaded', 'expired', 'deleted'];
  
  return Array.from({ length: 500 }, (_, index) => {
    const id = `rt-${index + 2000}`;
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const fileSize = Math.floor(Math.random() * 1000000000) + 1000000; // 1MB to 1GB
    const createdDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const expiresDate = new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const downloadCount = Math.floor(Math.random() * 5);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const senderIndex = index % 30;
    
    return {
      id,
      title: `Client Delivery ${index + 1}`,
      fileName: `client-delivery-${index + 1}.${fileType}`,
      fileSize,
      fileType,
      sender: {
        id: `sender-${senderIndex + 1}`,
        name: `Sender ${senderIndex + 1}`,
        email: `sender${senderIndex + 1}@example.com`,
        avatar: `/avatars/sender-${senderIndex + 1}.png`
      },
      recipients: [
        {
          id: 'user-1',
          name: 'Current User',
          email: 'user@example.com',
          avatar: '/avatars/user-1.png'
        }
      ],
      createdAt: createdDate.toISOString(),
      expiresAt: expiresDate.toISOString(),
      status,
      downloadCount,
      isPasswordProtected: Math.random() > 0.7,
      message: Math.random() > 0.6 ? `Please find the requested files attached. Let me know if you need anything else.` : undefined
    };
  });
};

export const requestTransfers = generateMockRequestTransfers();
