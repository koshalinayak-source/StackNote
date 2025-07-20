import React from "react";
import { ZapIcon } from "lucide-react"; // Optional icon (or use any SVG)

const RateLimitAlert = () => {
  return (
    <div className="w-full flex justify-center mt-4 px-4">
      <div className="flex items-start gap-4 max-w-2xl w-full rounded-lg bg-[#4B1D2E] border border-[#A9506F] p-4 text-white shadow-md">
        {/* Lightning icon (inline SVG) */}
        <div className="mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-[#FF9E80]" // Soft sunset orange
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" />
          </svg>
        </div>

        {/* Text content */}
        <div>
          <h3 className="font-semibold text-base">Rate Limit Reached</h3>
          <p className="text-sm text-[#f3b7c0] leading-relaxed">
            You've made too many requests in a short period. Please wait a
            moment.
            <br />
            <span className="text-[#FF9E80]">
              Try again in a few seconds for the best experience.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitAlert;
