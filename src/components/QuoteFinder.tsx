import { useState } from "react";

import quotesData from "../models/quotes.json";

export default function QuoteFinder(): JSX.Element {
  const quotes: string[] = quotesData;
  const [quoteIndex, setQuoteIndex] = useState<number | null>(null);

  function updateQuote() {
    setQuoteIndex((prevIndex) => {
      if (prevIndex === null || prevIndex === quotes.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  }

  return (
    <div className="flex flex-col mb-20">
      <button
        className="text-xs text-yellow-500 bg-black font-bold py-0 px-4 border rounded border-yellow-500 box-border mr-4 w-28 h-10 mb-4"
        onClick={updateQuote}
      >
        {quoteIndex === null ? "Show" : "Toggle"} Quote
      </button>
      {quoteIndex !== null && (
        <div className="h-16 w-5/6">
          <p className="text-slate-400 font-mono italic bg-black">
            "{quotes[quoteIndex]}"
          </p>
        </div>
      )}
    </div>
  );
}
