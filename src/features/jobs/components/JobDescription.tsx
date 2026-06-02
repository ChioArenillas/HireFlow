import { useState } from "react";

export function JobDescription({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className={`prose prose-neutral max-w-none ${
          !expanded ? "max-h-[400px] overflow-hidden" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-blue-500 mt-2"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
} 
