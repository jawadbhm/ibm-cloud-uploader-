
import React from 'react';
import { UploadStatus } from '../types';
import { CheckCircleIcon, ClockIcon, UploadingIcon } from './Icons';

interface StatusBadgeProps {
  status: UploadStatus;
}

const statusConfig = {
  [UploadStatus.PENDING]: {
    text: 'Pending',
    icon: <ClockIcon className="w-4 h-4 mr-1.5" />,
    className: 'bg-gray-200 text-gray-800',
  },
  [UploadStatus.UPLOADING]: {
    text: 'Uploading',
    icon: <UploadingIcon className="w-4 h-4 mr-1.5 animate-spin" />,
    className: 'bg-blue-200 text-blue-800',
  },
  [UploadStatus.COMPLETED]: {
    text: 'Completed',
    icon: <CheckCircleIcon className="w-4 h-4 mr-1.5" />,
    className: 'bg-green-200 text-green-800',
  },
  [UploadStatus.FAILED]: {
      text: 'Failed',
      icon: <CheckCircleIcon className="w-4 h-4 mr-1.5" />,
      className: 'bg-red-200 text-red-800',
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <div
      className={`flex items-center justify-center px-3 py-1.5 text-sm font-bold rounded-full w-32 ${config.className}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

export default StatusBadge;
