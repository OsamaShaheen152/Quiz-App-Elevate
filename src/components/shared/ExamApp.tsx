export default function ExamApp() {
  return (
    <div className="flex items-center gap-3 mb-16 mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"
          className="fill-blue-600"
          // stroke="white"
        />
        <path d="M10 10.5 8 13l2 2.5" stroke="white" fill="none" />
        <path d="m14 10.5 2 2.5-2 2.5" stroke="white" fill="none" />
      </svg>

      <h1 className="text-xl font-semibold text-gray-800">Exam App</h1>
    </div>
  );
}
