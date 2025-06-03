# SendsFar - Modern File Transfer Platform

![SendsFar Logo](public/logo.png)

SendsFar is a modern, user-friendly file transfer platform built with Next.js 14, offering a seamless experience for sending, receiving, and managing file transfers.

## Features

- 🚀 **Fast File Transfers**: Upload and share files quickly and securely
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔐 **Secure**: End-to-end encryption for all file transfers
- 📊 **Transfer Management**: Track and manage all your sent, received, and requested transfers
- ⏱️ **Expiration Control**: Set custom expiration times for your transfers
- 🎨 **Modern UI**: Built with shadcn/ui components for a beautiful user experience

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sendsfar.git
   cd sendsfar
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the required environment variables in `.env.local`

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure

```plaintext
src/
├── app/              # Next.js app directory
│   ├── api/          # API routes
│   ├── child-pages/  # Main application pages
│   └── layout.tsx    # Root layout
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Custom components
├── context/         # React context providers
├── lib/             # Utility functions and API helpers
└── types/           # TypeScript type definitions
```

## Key Features Implementation

### File Upload

- Drag-and-drop file upload with progress tracking
- Support for large files with chunked uploads
- File type validation and size limits

### Transfer Management

- View and manage sent transfers
- Track received transfers
- Handle transfer requests
- Pagination for better performance

### Security

- Secure file transfer with encryption
- Protected routes with authentication
- Rate limiting for API routes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

- Open an issue in the GitHub repository
- Contact our support team at [support@sendsfar.com](mailto:support@sendsfar.com)
- Check our [documentation](https://docs.sendsfar.com)
