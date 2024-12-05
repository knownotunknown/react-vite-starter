import type React from 'react';

interface Status {
  state: 'idle' | 'engine-initializing' | 'generating' | 'error' | 'complete';
  error?: string;
}

interface ResultsProps {
  data: string | null;
  status: Status;
}

const LoadingBar: React.FC = () => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
      <div 
        className="h-full bg-blue-500 animate-[loading_1.5s_ease-in-out_infinite]"
        style={{
          backgroundSize: '200% 100%',
          backgroundImage: 'linear-gradient(90deg, transparent 0%, #3B82F6 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export const Results: React.FC<ResultsProps> = ({ data, status }) => {
  const getMessage = () => {
    switch (status.state) {
      case 'engine-initializing':
        return 'Initializing AI engine. This may take a few moments...';
      case 'generating':
        return 'Generating your response...';
      case 'error':
        return status.error || 'An error occurred while generating your response.';
      case 'complete':
        return data || 'No response generated.';
      default:
        return 'Waiting to start...';
    }
  };

  const isLoading = status.state === 'engine-initializing' || status.state === 'generating';

  return (
    <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {status.state === 'complete' ? 'Your Response' : 'Processing'}
      </h2>
      
      {isLoading && (
        <div className="mb-6">
          <LoadingBar />
        </div>
      )}

      <div className={`text-xl leading-relaxed ${
        status.state === 'error' ? 'text-red-600' : 
        status.state === 'complete' ? 'text-gray-800' : 
        'text-gray-600'
      }`}>
        {getMessage()}
      </div>
    </div>
  );
};