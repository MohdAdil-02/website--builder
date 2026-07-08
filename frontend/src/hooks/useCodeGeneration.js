import { useState, useCallback } from 'react';
import { generateCode } from '../services/api';

export const useCodeGeneration = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generationType, setGenerationType] = useState(null);

  const generate = useCallback(async (prompt, type) => {
    setLoading(true);
    setError(null);
    setCode('');
    setGenerationType(type);

    try {
      const result = await generateCode(prompt, type);
      setCode(result.code);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setCode('');
    setError(null);
    setLoading(false);
    setGenerationType(null);
  }, []);

  return { code, loading, error, generationType, generate, reset };
};