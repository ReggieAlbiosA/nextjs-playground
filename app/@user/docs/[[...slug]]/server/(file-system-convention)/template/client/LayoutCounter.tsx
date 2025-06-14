'use client';

import { useState, useEffect, useRef } from 'react';

export function LayoutCounter() {
  const [count, setCount] = useState(0);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
      paragraphRef.current!.textContent = count.toString();
      console.log("mounted");
  }, [count]);

  return (
    <div className="flex items-center mt-4 space-x-4">
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 font-bold transition-colors bg-green-600 rounded-lg hover:bg-green-500"
      >
        Increment Layout Counter
      </button>
      <p ref={paragraphRef} className="px-4 py-2 font-mono text-2xl bg-gray-900 rounded-md"></p>
    </div>
  );
}