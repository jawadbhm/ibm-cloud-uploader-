
import React, { useState, useCallback, useRef } from 'react';
import { FileUploadIcon } from './Icons';

interface UploadAreaProps {
  onFileSelect: (files: File[]) => void;
  filesSelectedCount: number;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, filesSelectedCount }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(Array.from(e.target.files));
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
        isDragging ? 'border-ibm-blue bg-blue-50' : 'border-ibm-gray-60 bg-ibm-gray-20'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center text-ibm-gray-60">
        <FileUploadIcon className={`w-12 h-12 mb-4 transition-colors duration-300 ${isDragging ? 'text-ibm-blue' : 'text-ibm-gray-60'}`} />
        <p className="font-semibold text-ibm-gray-100">
          Drag & drop files here, or <span className="text-ibm-blue">click to browse</span>.
        </p>
        <p className="text-sm mt-1">Select one or more files to upload</p>
        {filesSelectedCount > 0 && (
             <p className="text-sm mt-4 font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">{filesSelectedCount} file(s) selected and ready for upload.</p>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
