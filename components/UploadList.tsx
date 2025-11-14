
import React from 'react';
import { UploadItem, UploadStatus } from '../types';
import StatusBadge from './StatusBadge';
import { FileIcon } from './Icons';

interface UploadListProps {
  uploads: UploadItem[];
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const UploadListItem: React.FC<{ item: UploadItem }> = ({ item }) => (
  <div className="bg-ibm-gray-20 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <FileIcon className="w-8 h-8 text-ibm-blue flex-shrink-0 hidden sm:block" />
    <div className="flex-grow w-full">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
        <p className="font-semibold text-ibm-gray-100 truncate pr-2">{item.file.name}</p>
        <p className="text-sm text-ibm-gray-60 flex-shrink-0">{formatBytes(item.file.size)}</p>
      </div>
      <div className="w-full bg-ibm-gray-60 rounded-full h-2.5 mb-2">
        <div
          className="bg-ibm-blue h-2.5 rounded-full transition-all duration-300 ease-linear"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
       <div className="flex flex-col sm:flex-row justify-between text-sm text-ibm-gray-60">
            <div>
                <span className="font-bold">Bucket:</span> {item.bucket}
            </div>
            {item.status === UploadStatus.COMPLETED && item.completedAt && (
                <div>
                    <span className="font-bold">Completed:</span> {item.completedAt.toLocaleString()}
                </div>
            )}
       </div>
    </div>
    <div className="flex-shrink-0 ml-auto sm:ml-0">
        <StatusBadge status={item.status} />
    </div>
  </div>
);

const UploadList: React.FC<UploadListProps> = ({ uploads }) => {
  if (uploads.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-ibm-gray-20 rounded-lg">
        <h3 className="text-xl font-semibold text-ibm-gray-100">No Uploads Yet</h3>
        <p className="text-ibm-gray-60 mt-2">Select files and click "Upload" to begin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-ibm-gray-100 pb-2 border-b-2 border-ibm-gray-20">
        Upload Queue
      </h2>
      {uploads.map((item) => (
        <UploadListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default UploadList;
