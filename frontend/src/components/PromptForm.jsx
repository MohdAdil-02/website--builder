import { useState } from 'react';
import { FiSend, FiTrash2 } from 'react-icons/fi';

const CODE_TYPES = [
  { value: 'frontend', label: 'Frontend (React)', icon: '🎨' },
  { value: 'backend', label: 'Backend (Express)', icon: '⚙️' },
  { value: 'fullstack', label: 'Full Stack', icon: '🔗' },
  { value: 'api', label: 'API Endpoint', icon: '🔌' },
];

const PromptForm = ({ onSubmit, loading, onReset }) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('frontend');
  const [promptError, setPromptError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setPromptError('Please enter a prompt');
      return;
    }
    if (prompt.trim().length < 5) {
      setPromptError('Prompt must be at least 5 characters');
      return;
    }
    if (prompt.length > 10000) {
      setPromptError('Prompt too long. Maximum 10000 characters');
      return;
    }

    setPromptError('');
    onSubmit(prompt.trim(), type);
  };

  const handleReset = () => {
    setPrompt('');
    setType('frontend');
    setPromptError('');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe what you want to build
        </label>
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (promptError) setPromptError('');
          }}
          placeholder="e.g., Create a login form with email validation and a submit button..."
          rows={5}
          disabled={loading}
          className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white 
                     placeholder-gray-500 focus:outline-none focus:ring-2 
                     transition-colors resize-none
                     ${promptError 
                       ? 'border-red-500 focus:ring-red-500/50' 
                       : 'border-gray-700 focus:ring-blue-500/50 focus:border-blue-500'
                     }
                     disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {promptError && (
          <p className="mt-1 text-sm text-red-400">{promptError}</p>
        )}
        <div className="mt-1 text-xs text-gray-500 text-right">
          {prompt.length}/10000 characters
        </div>
      </div>

      {/* Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select code type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CODE_TYPES.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setType(value)}
              disabled={loading}
              className={`p-3 rounded-lg border text-sm font-medium transition-all
                        ${type === value
                          ? 'border-blue-500 bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/10'
                          : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="block text-lg mb-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                     bg-blue-600 hover:bg-blue-700 disabled:opacity-50 
                     rounded-lg font-medium transition-colors
                     disabled:cursor-not-allowed"
        >
          <FiSend className="text-lg" />
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="px-4 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50
                     rounded-lg font-medium transition-colors
                     disabled:cursor-not-allowed"
          title="Clear all"
        >
          <FiTrash2 className="text-lg" />
        </button>
      </div>
    </form>
  );
};

export default PromptForm;