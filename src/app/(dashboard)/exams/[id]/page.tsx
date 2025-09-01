import Exams from "@/app/(dashboard)/_components/exams";

export default function ExamsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Exams subjectId={id} />
    </div>
  );
}
