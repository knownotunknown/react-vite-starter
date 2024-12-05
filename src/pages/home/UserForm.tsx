import type React from 'react';
import { useState } from 'react';
import type { FormData } from './types';

interface UserFormProps {
  onSubmit: (data: FormData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [profession, setProfession] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');

  const fields: string[] = [
    'Academia',
    'Bioinformatics',
    'Demographics',
    'Economics',
    'Ecology',
    'Healthcare',
    'Marketing',
    'Nutrition Science'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ profession, location, minutes });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl p-8 bg-white rounded-lg shadow-md">
      <p className="text-xl text-gray-800 leading-relaxed mb-6">
        I am a{' '}
        <input
          type="text"
          value={profession}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfession(e.target.value)}
          className="inline-block w-32 px-2 py-1 mx-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="profession"
          required
        />{' '}
        working in{' '}
        <select
          value={location}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value)}
          className="inline-block w-48 px-2 py-1 mx-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          required
        >
          <option value="">Select field</option>
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>{' '}
        with{' '}
        <input
          type="number"
          value={minutes}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinutes(e.target.value)}
          className="inline-block w-24 px-2 py-1 mx-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="minutes"
          required
        />{' '}
        minutes of time.
      </p>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};