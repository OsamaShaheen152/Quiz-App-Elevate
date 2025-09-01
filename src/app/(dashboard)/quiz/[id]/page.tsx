import { Quiz } from "../../_components/quiz";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="mt-8 w-full">
      <Quiz examId={params.id} />
    </div>
  );
}
