import { Quiz } from "../../_components/quiz";

export default function page({ params }: { params: { id: string } }) {
  // const questions = await fetchQuizQuestions(params.id);
  // console.log(questions);
  return (
    <div className="container mx-auto py-8 px-4">
      <Quiz examId={params.id} />
    </div>
  );
}
