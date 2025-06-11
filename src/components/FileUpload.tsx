'use client';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/dropzone.css';
import { Card } from '@/components/ui/card';

Dropzone.autoDiscover = false;

interface FileUploadState {
  files: File[];
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface FileUploadHandle {
  uploadFiles: () => Promise<void>;
  files: File[];
  clearFiles: () => void;
}

type FileUploadProps = React.HTMLAttributes<HTMLDivElement>;

const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(({
  className = '',
  ...props
}, ref) => {
  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    progress: 0,
    error: null
  });

  // Track drag state for visual feedback

  // const { files, isUploading, progress, error } = state;
  const { files, error } = state;

  const handleFiles = (newFiles: File[]) => {
    setState((prev: FileUploadState) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
      error: null,
    }));
  };

  const clearFiles = () => {
    setState((prev: FileUploadState) => ({
      ...prev,
      files: [],
      error: null,
    }));
  };
  
  // Extended type for Dropzone files that includes fullPath and formData
  interface DropzoneFileWithPath extends DropzoneFile {
    fullPath?: string;
    formData?: () => FormData;
  }
  

  // Expose methods via ref
  useImperativeHandle<FileUploadHandle, FileUploadHandle>(ref, () => ({
    uploadFiles: async () => {
      if (files.length === 0) return;
      
      setState(prev => ({ ...prev, isUploading: true, progress: 0 }));
      
      try {
        // Process each file with progress updates
        const totalFiles = files.length;
        let completedFiles = 0;
        
        for (const file of files) {
          // Get the full path if it exists
          const fileWithPath = file as unknown as { fullPath?: string };
          const fullPath = fileWithPath.fullPath || file.name;
          
          // Create a FormData object to send the file
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fullPath', fullPath);
          
          // Upload the file to the server
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
          }
          
          const result = await response.json();
          console.log(`File ${file.name} uploaded successfully at path ${fullPath}:`, result);
          
          // Update progress
          completedFiles++;
          const progressPercentage = Math.round((completedFiles / totalFiles) * 100);
          setState(prev => ({ ...prev, progress: progressPercentage }));
        }
        
        // Clear files after successful upload
        setState(prev => ({
          ...prev,
          isUploading: false,
          progress: 100,
          files: [],
        }));
      } catch (error) {
        console.error('Upload error:', error);
        setState(prev => ({
          ...prev,
          isUploading: false,
          error: error instanceof Error ? error.message : 'Failed to upload files to server',
        }));
      }
    },
    files,
    clearFiles,
  }));
  // Handle error display and reset
  useEffect(() => {
    if (state.error) {
      // Optionally, you can show a toast notification or alert here
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, error: null })); // Reset error after displaying it
      }, 3000); // Clear error after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
    // Reset error after displaying it

   }, [state.error]);

  useEffect(() => {
    const dropzone = new Dropzone('#upload-zone', {
      // Set the URL to our API endpoint for file uploads
      url: '/api/upload',
      // url: 'javascript:void(0);',
      acceptedFiles: [
        // Image files
        'image/*',
        '.psd', '.tif', '.tiff', '.ai', '.eps', '.svg', '.raw', '.cr2', '.nef', '.orf', '.sr2', '.bmp', '.heic', '.indd', '.xcf',
        // Microsoft Office documents
        '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
        // OpenDocument formats
        '.txt', '.rtf', '.csv', '.tsv', '.md', '.xml', '.json', '.yaml', '.yml', '.epub', '.mobi', '.tex', '.log',
        // Apple iWork documents
        '.pages', '.numbers', '.key',
        // Google Docs formats
        '.gdoc', '.gsheet', '.gslides',
        // Other common document formats
        '.txt', '.rtf', '.csv', '.tsv', '.md', '.xml', '.json', '.yaml', '.yml',
        // PDF
        'application/pdf',
        // Audio files
        '.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.wma', '.opus', '.aiff', '.alac',
        // Video files
        '.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mpeg', '.mpg', '.3gp', '.m4v', '.ts',
        // Archive and compressed files
        '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.iso'
      ].join(','), // Accept all image files, PDFs, microsoft office documents, code archives, RAR, ZIP and common archive formats and compressed formats 
      // maxFiles: 8,
      maxFilesize: 10240, // 10GB
      addRemoveLinks: true,
      // clickable: true,
      // Enable auto processing to upload files automatically
      autoProcessQueue: true,
      // Enable parallel uploads for better performance
      parallelUploads: 108,
      // chunking: true, // Enable chunking for large files
      chunking: true,
      // Folder upload settings
      // uploadMultiple: true,
      // Disable image thumbnails for better performance
      createImageThumbnails: true,
      // Important for Chrome to include directory structure
      forceFallback: false,

      // Allow dropping folders
      dictDefaultMessage: '<div class="flex flex-col items-center justify-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" class="w-16 h-16 text-gray-400 dark:text-gray-600" width="256" height="256" fill="currentColor"><path d="M18.4,7.379a1.128,1.128,0,0,1-.769-.754h0a8,8,0,1,0-15.1,5.237A1.046,1.046,0,0,1,2.223,13.1,5.5,5.5,0,0,0,.057,18.3,5.622,5.622,0,0,0,5.683,23H11a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5.683a3.614,3.614,0,0,1-3.646-2.981,3.456,3.456,0,0,1,1.376-3.313A3.021,3.021,0,0,0,4.4,11.141a6.113,6.113,0,0,1-.073-4.126A5.956,5.956,0,0,1,9.215,3.05,6.109,6.109,0,0,1,9.987,3a5.984,5.984,0,0,1,5.756,4.28,2.977,2.977,0,0,0,2.01,1.99,5.934,5.934,0,0,1,.778,11.09.976.976,0,0,0-.531.888h0a.988.988,0,0,0,1.388.915c4.134-1.987,6.38-7.214,2.88-12.264A6.935,6.935,0,0,0,18.4,7.379Z"/><path d="M18.707,16.707a1,1,0,0,0,0-1.414l-1.586-1.586a3,3,0,0,0-4.242,0l-1.586,1.586a1,1,0,0,0,1.414,1.414L14,15.414V23a1,1,0,0,0,2,0V15.414l1.293,1.293a1,1,0,0,0,1.414,0Z"/></svg><div class="text-lg text-center font-medium text-gray-900 dark:text-gray-100">Drop files or folders to upload<div class="text-sm text-gray-500 dark:text-gray-400">or click to select</div></div></div>',
      previewsContainer: '#upload-zone',
      dictFallbackMessage: 'Your browser does not support drag\'n\'drop file uploads.',
      dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
      dictInvalidFileType: 'You can\'t upload files of this type.',
      dictRemoveFileConfirmation: 'Are you sure you want to remove this file?',
      dictFileSizeUnits: {
        kb: 'KB',
        mb: 'MB',
        gb: 'GB',
        tb: 'TB',
      },
      
      dictFileTooBig: 'File is too big ({{filesize}}MB). Max filesize: {{maxFilesize}}MB',
      dictResponseError: 'Server responded with {{statusCode}} code',
      dictCancelUpload: 'Cancel upload',
      dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
      // dictRemoveFile: '<svg  viewBox="0 0 54 54"fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z"/></svg>',
      dictRemoveFile: 'Remove File',
      dictMaxFilesExceeded: 'You can only upload {{maxFiles}} files at a time',
    });

    // Add support for folder uploads by capturing the full path
    dropzone.on('addedfile', (file: DropzoneFile) => {
      const fileWithPath = file as DropzoneFileWithPath;
      const fullPath = fileWithPath.fullPath || file.name;
      console.log("A file has been added", file.name, fullPath);
      
      // Create a File object with the path information
      const fileWithMeta = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified || Date.now()
      });
      
      // Add path information to the file object
      Object.defineProperty(fileWithMeta, 'fullPath', {
        value: fullPath,
        writable: true,
        configurable: true,
        enumerable: true
      });
      
      handleFiles([fileWithMeta]);
    });

    dropzone.on('sending', (file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => {
      const fileWithPath = file as DropzoneFileWithPath;
      const fullPath = fileWithPath.fullPath || file.name;
      
      // Add the path information to formData with the correct key
      formData.append('relativePath', fullPath);
      formData.append('file', file);
      
      // Set up progress tracking
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setState(prev => ({
            ...prev,
            progress: percentComplete,
          }));
        }
      });
      
      // Handle response
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Upload successful:', xhr.responseText);
          } else {
            const error = xhr.responseText ? JSON.parse(xhr.responseText).error : 'Upload failed';
            setState(prev => ({ ...prev, error }));
            dropzone.removeFile(file);
          }
        }
      };
      
      setState((prev: FileUploadState) => ({
        ...prev,
        isUploading: true,
        progress: 0,
      }));
      
      console.log("Sending file with path:", fullPath);
    });

    // Handle drag events for visual feedback
    dropzone.on('dragenter', () => {
      document.getElementById('upload-zone')?.classList.add('dz-drag-hover');
    });
    dropzone.on('dragleave', () => {
      document.getElementById('upload-zone')?.classList.remove('dz-drag-hover');
    });
    dropzone.on('drop', () => {
      document.getElementById('upload-zone')?.classList.remove('dz-drag-hover');
    });
    
    // Handle upload progress
    dropzone.on('uploadprogress', (_: unknown, progress: number) => {
      setState((prev: FileUploadState) => ({
        ...prev,
        progress: Math.round(progress),
      }));
      console.log(`Upload progress: ${progress}%`);
    });
    dropzone.on('success', (_: unknown, file: DropzoneFile) => {
      setState((prev: FileUploadState) => ({
        ...prev,
        files: prev.files.filter((f: File) => f.name !== file.name),
        isUploading: false,
        progress: 0,
      }));
      console.log(`Upload successful: ${file.name}`);
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dropzone.on('complete', (_: unknown, file: DropzoneFile) => {
      setState((prev: FileUploadState) => ({
        ...prev,
        isUploading: false,
        progress: 0,
      }));
      // dropzone.removeFile(file);
      console.log("A file has been completed");
    });
    dropzone.on('error', (file: DropzoneFile, message: string | Error) => {
      console.error('Upload error:', message);
      const errorMessage = typeof message === 'string' ? message : message.message;
      setState((prev: FileUploadState) => ({ 
        ...prev, 
        error: errorMessage,
        isUploading: false,
        progress: 0
      }));
      dropzone.removeFile(file);
    });

    return () => {
      dropzone.destroy();
    };
  }, []);
  

  return (
    <div className={`w-full relative grid justify-items-stretch align-items-stretch min-h-full ${className}`} {...props}>
      <Card
        id="upload-zone"
        className="dropzone bg-muted"
      >
        {/* <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium">Drag and drop files or folders here</p>
            <p className="text-sm">or click to select files</p>
          </div>
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Files to upload:</h3>
              <ul className="list-disc list-inside mt-2">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
      </Card>

      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            
            className="absolute bottom-5 right-[10%] left-[10%] max-h-40 min-h-10 p-4 text-red-700 bg-red-100/30 dark:bg-red-900/20 dark:text-red-400 backdrop-blur-sm shadow-lg rounded-lg text-center font-bold z-[1000] transition-all duration-300"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
    
    </div>

  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
