
import React from 'react';
import { Bucket } from '../types';
import { BucketIcon } from './Icons';

interface BucketSelectorProps {
  buckets: Bucket[];
  selectedBucket: Bucket;
  onChange: (bucket: Bucket) => void;
}

const BucketSelector: React.FC<BucketSelectorProps> = ({ buckets, selectedBucket, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="bucket-select" className="mb-2 text-sm font-bold text-ibm-gray-60">
        Target Bucket
      </label>
      <div className="relative">
        <BucketIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ibm-gray-60 pointer-events-none" />
        <select
          id="bucket-select"
          value={selectedBucket}
          onChange={(e) => onChange(e.target.value as Bucket)}
          className="w-full pl-10 pr-4 py-3 bg-ibm-gray-20 border border-ibm-gray-60 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-ibm-blue text-ibm-gray-100"
        >
          {buckets.map((bucket) => (
            <option key={bucket} value={bucket}>
              {bucket}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BucketSelector;
