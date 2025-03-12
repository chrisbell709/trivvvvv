// This file will manage question generation or fetching from a source

// Sample questions database (in production, you'd use a real database or API)
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of Japan?",
    answer: "Tokyo",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer: "William Shakespeare",
    category: "Literature",
    difficulty: "Easy"
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au",
    category: "Science",
    difficulty: "Medium"
  },
  {
    question: "In which year did World War II end?",
    answer: "1945",
    category: "History",
    difficulty: "Medium"
  }
];
// Function to get a question based on the current date (ensuring it's consistent for the day)
export async function getQuestionOfTheDay() {
  // Get current date in YYYY-MM-DD format to use as seed
  const today = new Date().toISOString().split('T')[0];
  
  // Create a simple hash from the date string to pick a question
  const dateHash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Use the hash to pick a question from our array
  const questionIndex = dateHash % questions.length;
  
  return questions[questionIndex];
}
