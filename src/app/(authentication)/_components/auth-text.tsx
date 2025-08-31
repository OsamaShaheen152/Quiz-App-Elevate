import ExamApp from "@/components/shared/ExamApp";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";

export default function AuthText() {
  return (
    <div className="min-h-screen w-[720px]  bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      <div className="container px-32 py-12">
        {/* Header */}
        <ExamApp />

        {/* Main Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Empower your learning journey
            <br />
            with our smart exam platform.
          </h2>

          {/* Features */}
          <div className="space-y-8 mt-12">
            {/* Tailored Diplomas */}
            <div className="flex gap-4">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="  border-2  border-blue-600 p-2 ">
                  <Brain className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Tailored Diplomas
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
              <div className="w-12 h-12  rounded-lg flex items-center justify-center flex-shrink-0">
                <div className=" border-2  border-blue-600 p-2">
                  <BookOpenCheck className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Focused Exams
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Access topic-specific tests including
                  <br />
                  HTML, CSS, JavaScript, and more.
                </p>
              </div>
            </div>

            {/* Smart Multi-Step Forms */}
            <div className="flex gap-4">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="border-2  border-blue-600 p-2">
                  <RectangleEllipsis className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Smart Multi-Step Forms
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
