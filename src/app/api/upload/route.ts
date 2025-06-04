import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

// This API route handles file uploads and saves them to the /uploads folder
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const relativePath = formData.get('relativePath') as string;
    
    if (!file || !(file instanceof File)) {
      console.error('Invalid file:', file);
      return NextResponse.json(
        { error: 'No valid file uploaded' },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the base uploads directory if it doesn't exist
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
        try {
          await mkdir(targetDir, { recursive: true });
          console.log(`Created directory: ${targetDir}`);
        } catch (error) {
          console.error(`Error creating directory ${targetDir}:`, error);
          throw error;
        }
      }
    }

    // Create a unique filename to prevent overwriting but preserve the original name
    const uniqueFilename = `${Date.now()}-${filename}`;
    const filePath = join(targetDir, uniqueFilename);

    // Write the file to the target directory
    await writeFile(filePath, buffer);

    // Calculate the path relative to the uploads directory for the response
    const relativeDirPath = targetDir.replace(uploadsDir, '').replace(/\\/g, '/');
    const responsePath = join('/uploads', relativeDirPath, uniqueFilename).replace(/\\/g, '/');

    return NextResponse.json({
      message: 'File uploaded successfully',
      filename: uniqueFilename,
      originalPath: relativePath || filename,
      path: responsePath,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
