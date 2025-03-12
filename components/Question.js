export default function Question({ question, category, difficulty }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Category: {category}</span>
        <span>Difficulty: {difficulty}</span>
      </div>
      <div className="text-lg font-medium text-gray-900">{question}</div>
    </div>
  );
}
