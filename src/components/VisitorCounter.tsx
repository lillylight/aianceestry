'use client';

import { useEffect, useState } from 'react';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial count fetch
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/counter');
        if (!response.ok) throw new Error('Failed to fetch count');
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        console.error('Error fetching visitor count:', err);
        setError('Could not load visitor count');
      }
    };

    fetchCount();
  }, []);

  if (error) return null; // Don't show anything if there's an error

  return (
    <div className="fixed bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm z-50">
      {count !== null ? (
        `👥 ${count.toLocaleString()} reports generated`
      ) : (
        <span className="inline-block w-32 h-4 bg-gray-700 rounded-full animate-pulse"></span>
      )}
    </div>
  );
};

export default VisitorCounter;
