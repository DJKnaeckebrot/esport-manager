import Link from "next/link";
import { CircleIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 700"
            width="50"
            height="50"
            className="dark:fill-white fill-black"
          >
            <title>e logo</title>
            <g id="Layer 1">
              <path
                id="Form 1"
                fillRule="evenodd"
                d="m138.6 208.3c0.2 3.4 0.4 98.7 0.4 98.7l305-196-76-50c0 0-229.2 147.5-229.4 147.3z"
              />
              <path
                id="Form 2"
                fillRule="evenodd"
                d="m102 461l76 49 183-116-1-99z"
              />
              <path
                id="Form 3"
                fillRule="evenodd"
                d="m280 575l75 51 222-145-1-98z"
              />
            </g>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
