import Exams from "../../_components/exams";

export default function ExamsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1 className="text-2xl font-bold">Exams</h1>
      <Exams subjectId={id} />
    </div>
  );
}
