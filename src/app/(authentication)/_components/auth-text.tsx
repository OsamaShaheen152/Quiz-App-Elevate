import ExamApp from "@/components/shared/ExamApp";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";

export default function AuthText() {
  return (
    <div className="min-h-screen w-[720px] bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      <div className="container px-32 py-12">
        {/* Header */}
        <ExamApp />

        {/* Main Content */}
        <div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900">
            Empower your learning journey
            <br />
            with our smart exam platform.
          </h2>

          {/* Features */}
          <div className="mt-12 space-y-8">
            {/* Tailored Diplomas */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <div className="border-2 border-blue-600 p-2">
                  <Brain className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-600">
                  Tailored Diplomas
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Choose from specialized tracks like
                  <br />
                  Frontend, Backend, and Mobile
                  <br />
                  Development.
                </p>
              </div>
            </div>

            {/* Focused Exams */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <div className="border-2 border-blue-600 p-2">
                  <BookOpenCheck className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-600">
                  Focused Exams
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Access topic-specific tests including
                  <br />
                  HTML, CSS, JavaScript, and more.
                </p>
              </div>
            </div>

            {/* Smart Multi-Step Forms */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                <div className="border-2 border-blue-600 p-2">
                  <RectangleEllipsis className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-600">
                  Smart Multi-Step Forms
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Choose from specialized tracks like
                  <br />
                  Frontend, Backend, and Mobile
                  <br />
                  Development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
