'use client'


import { useState } from 'react'

export default function Home() {

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState<string[]>([]);
  const [ready, setReady] = useState<string[]>([]);

  const classify = async (text: any) => {
    if (!text) return;
    if (ready === null) {
      setReady(prevArray => [...prevArray, 'newItem']);
    }

    // Make a request to the /classify route on the server.
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(prevArray => [...prevArray, 'newItem']);

    const json = await result.json();
    setResult(json);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">AI Word Detector</h1>
      <h2 className="text-2xl mb-4 text-center font-bold ">Type any WORD , Tells ( Negative or Positive) ; </h2>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onInput={e => {
          const target = e.target;
          if (target instanceof HTMLInputElement) {
            classify(target.value);
          }
        }}
      />

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}