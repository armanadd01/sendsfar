import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.S3_ENDPOINT || undefined,
});

// This API route handles file uploads and saves them to the /uploads folder
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const relativePath = formData.get('relativePath') as string;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No valid file uploaded' },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Local save
    const uploadsDir = join(cwd(), 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Handle relative path if provided (for folder structure)
    let targetDir = uploadsDir;
    let filename = file.name;

    if (relativePath) {
      // Clean the relative path to prevent directory traversal attacks
      // Replace backslashes with forward slashes and remove leading slashes
      const cleanPath = relativePath.replace(/\\/g, '/').replace(/^\/+/, '');
      // Extract the directory path and filename
      const pathParts = cleanPath.split('/');
      filename = pathParts.pop() || file.name; // Use the last part as filename
      if (pathParts.length > 0) {
        // If we have path parts, we have a folder structure
        const dirPath = pathParts.join('/');
        targetDir = join(uploadsDir, dirPath);
        // Create the directory structure
        await mkdir(targetDir, { recursive: true });
      }
    }

    // Create a unique filename to prevent overwriting but preserve the original name
    const uniqueFilename = `${Date.now()}-${filename}`;
    const filePath = join(targetDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // S3 upload
    const s3Key = relativePath
      ? relativePath.replace(/\\/g, '/').replace(/^\/+/, '')
      : filename;
    const s3UniqueKey = `${Date.now()}-${s3Key}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: s3UniqueKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const relativeDirPath = targetDir.replace(uploadsDir, '').replace(/\\/g, '/');
    const responsePath = join('/uploads', relativeDirPath, uniqueFilename).replace(/\\/g, '/');

    return NextResponse.json({
      message: 'File uploaded successfully',
      filename: uniqueFilename,
      originalPath: relativePath || filename,
      path: responsePath,
      s3Key: s3UniqueKey,
      s3Url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${s3UniqueKey}`,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
