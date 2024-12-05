import type React from 'react';
import { useState } from 'react';
import { UserForm } from './UserForm';
import { Results } from './Results';
import type { FormData } from './types';
import { useLLMEngine } from '../hooks/useLLMEngine';

type Status = {
  state: 'idle' | 'engine-initializing' | 'generating' | 'error' | 'complete';
  error?: string;
};

export const Home: React.FC = () => {
  const { generateResponse, engineLoaded } = useLLMEngine();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const handleSubmit = async (data: FormData) => {
    setFormData(data);
    console.log(formData);
    
    if (!engineLoaded) {
      setStatus({ 
        state: 'engine-initializing', 
        error: 'LLM engine is still initializing...' 
      });
      return;
    }

    try {
      setStatus({ state: 'generating' });
      // Change the below code with a prompt based on formData. data.prompt
      const result = await generateResponse('Is the Earth flat?');
      
      if (result.error) {
        setStatus({ state: 'error', error: result.error });
      } else {
        setResponse(result.response);
        setStatus({ state: 'complete' });
      }
    } catch (err) {
      setStatus({ 
        state: 'error', 
        error: err instanceof Error ? err.message : 'An unexpected error occurred' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {status.state === 'idle' ? (
        <UserForm onSubmit={handleSubmit} />
      ) : (
        <Results
          data={response}
          status={status}
        />
      )}
    </div>
  );
};

export default Home;