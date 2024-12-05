import type React from 'react';
import type { FormData } from './types';

interface ResultsProps {
  data: FormData;
}

export const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <div className="max-w-2xl p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Response</h2>
      <p className="text-xl text-gray-800 leading-relaxed">
        I am a {data.profession} working in {data.location} with {data.minutes} minutes of time.
      </p>
    </div>
  );
};
