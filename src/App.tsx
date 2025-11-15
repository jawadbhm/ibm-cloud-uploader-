
import React, { useState, useEffect, useRef } from 'react';
import { Bucket, UploadItem, UploadStatus } from './types';
import BucketSelector from './components/BucketSelector';
import UploadArea from './components/UploadArea';
import UploadList from './components/UploadList';
import { CloudUploadIcon, IBMCloudIcon } from './components/Icons';

const BUCKETS: Bucket[] = ['dev-uploads', 'prod-reports', 'archive-logs'];

const App: React.FC = () => {
  const [selectedBucket, setSelectedBucket] = useState<Bucket>(BUCKETS[0]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const uploadIntervals = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    return () => {
      // Cleanup intervals on component unmount
      uploadIntervals.current.forEach(intervalId => clearInterval(intervalId));
    };
  }, []);

  const handleFileSelect = (files: File[]) => {
    setFilesToUpload(files);
  };
  
  const handleClear = () => {
    uploadIntervals.current.forEach(intervalId => clearInterval(intervalId));
    uploadIntervals.current.clear();
    setUploads([]);
    setFilesToUpload([]);
    setIsUploading(false);
  };

  const startUploadSimulation = (item: UploadItem) => {
    const intervalId = window.setInterval(() => {
      setUploads(prevUploads => 
        prevUploads.map(upload => {
          if (upload.id === item.id && upload.status === UploadStatus.UPLOADING) {
            const newProgress = Math.min(upload.progress + Math.random() * 10, 100);
            if (newProgress >= 100) {
              clearInterval(uploadIntervals.current.get(item.id));
              uploadIntervals.current.delete(item.id);
              return { ...upload, progress: 100, status: UploadStatus.COMPLETED, completedAt: new Date() };
            }
            return { ...upload, progress: newProgress };
          }
          return upload;
        })
      );
    }, 200);
    uploadIntervals.current.set(item.id, intervalId);
  };

  const handleUpload = () => {
    if (filesToUpload.length === 0 || isUploading) return;

    setIsUploading(true);
    
    const newUploads: UploadItem[] = filesToUpload.map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      bucket: selectedBucket,
      status: UploadStatus.PENDING,
      progress: 0,
      completedAt: null,
    }));
    
    setUploads(prev => [...prev, ...newUploads]);
    setFilesToUpload([]);

    // Start the upload process for the new items
    newUploads.forEach(item => {
        // Change status to uploading and start simulation
        setUploads(prevUploads => 
            prevUploads.map(upload => 
                upload.id === item.id ? { ...upload, status: UploadStatus.UPLOADING } : upload
            )
        );
        startUploadSimulation(item);
    });
  };

  useEffect(() => {
    const allCompleted = uploads.length > 0 && uploads.every(u => u.status === UploadStatus.COMPLETED || u.status === UploadStatus.FAILED);
    if(allCompleted) {
        setIsUploading(false);
    }
  }, [uploads]);


  return (
    <div className="min-h-screen bg-ibm-gray-20 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-2">
                <IBMCloudIcon className="w-16 h-16 text-ibm-blue" />
                <h1 className="text-4xl font-semibold text-ibm-gray-100">IBM Cloud Uploader</h1>
            </div>
          <p className="text-lg text-ibm-gray-60">Mock Object Storage Dashboard</p>
        </header>

        <main className="bg-ibm-gray-10 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <BucketSelector
              buckets={BUCKETS}
              selectedBucket={selectedBucket}
              onChange={setSelectedBucket}
            />
            <div className="md:col-span-2 flex items-center space-x-4">
                <button
                    onClick={handleUpload}
                    disabled={filesToUpload.length === 0 || isUploading}
                    className="w-full bg-ibm-blue text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-blue-700 disabled:bg-ibm-gray-60 disabled:cursor-not-allowed"
                >
                    <CloudUploadIcon className="w-6 h-6" />
                    <span>{isUploading ? 'Uploading...' : `Upload ${filesToUpload.length} File(s)`}</span>
                </button>
                 <button
                    onClick={handleClear}
                    disabled={uploads.length === 0}
                    className="w-full bg-ibm-gray-80 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 hover:bg-ibm-gray-100 disabled:bg-ibm-gray-60 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Clear Uploads
                </button>
            </div>
          </div>

          <UploadArea onFileSelect={handleFileSelect} filesSelectedCount={filesToUpload.length} />
          
          <div className="mt-8">
            <UploadList uploads={uploads} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
