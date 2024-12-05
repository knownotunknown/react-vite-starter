import type React from 'react';
import { useState } from 'react';
import { UserForm } from './UserForm';
import { Results } from './Results';
import type { FormData } from './types';
import { useLLMEngine } from '../hooks/useLLMEngine';

export const Home: React.FC = () => {
  const { generateResponse, engineLoaded } = useLLMEngine();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setFormData(data);
    setSubmitted(true);

    if (!engineLoaded) {
      setError("LLM engine is still initializing...");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await generateResponse(data.prompt);
    if (result.error) {
      setError(result.error);
    } else {
      setResponse(result.response);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!submitted ? (
        <UserForm onSubmit={handleSubmit} />
      ) : (
        formData && (
          <Results
            data={formData}
            response={response}
            loading={loading}
            error={error}
          />
        )
      )}
    </div>
  );
};

export default Home;