import { useState, useEffect } from 'react';
import Head from 'next/head';
import Timer from '../components/Timer';
import Question from '../components/Question';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  const [gameState, setGameState] = useState('idle'); // idle, playing, answered, finished
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [message, setMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch daily question
  useEffect(() => {
    if (gameState === 'playing' && !question) {
      fetchQuestion();
    }
  }, [gameState, question]);

  // Fetch leaderboard
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestion(data);
      setTimeLeft(30);
    } catch (error) {
      console.error('Error fetching question:', error);
      setMessage('Error loading question. Please try again.');
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/scores');
      const data = await res.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const startGame = () => {
    if (!username.trim()) {
      setMessage('Please enter a username to start.');
      return;
    }
    setGameState('playing');
    setScore(0);
    setMessage('');
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      setMessage('Please enter an answer.');
      return;
    }

    const isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();
    setGameState('answered');
    
    if (isCorrect) {
      const pointsEarned = Math.ceil(timeLeft / 3); // More points for faster answers
      setScore(score + pointsEarned);
      setMessage(`Correct! You earned ${pointsEarned} points.`);
    } else {
      setMessage(`Incorrect! The correct answer was: ${question.answer}`);
    }

    // Save score to database
    if (isCorrect) {
      try {
        await fetch('/api/scores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            score: Math.ceil(timeLeft / 3),
            date: new Date().toISOString(),
          }),
        });
        
        // Refresh leaderboard
        fetchLeaderboard();
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
    
    setUserAnswer('');
    setGameState('finished');
  };

  const handleTimeUp = () => {
    if (gameState === 'playing') {
      setMessage('Time's up! You didn't answer in time.');
      setGameState('finished');
    }
  };

  const playAgain = () => {
    setQuestion(null);
    setGameState('playing');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Daily Trivia Challenge</title>
        <meta name="description" content="Test your knowledge with a daily trivia question" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900">Daily Trivia Challenge</h1>
              <p className="mt-2 text-sm text-gray-600">Test your knowledge with our daily question</p>
            </div>

            {gameState === 'idle' && (
              <div className="mt-8">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Your Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <button
                  onClick={startGame}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Game
                </button>
              </div>
            )}

            {gameState === 'playing' && question && (
              <div className="mt-8">
                <div className="mb-4 flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-700">
                    Score: {score}
                  </div>
                  <Timer 
                    seconds={timeLeft} 
                    setSeconds={setTimeLeft} 
                    onTimeUp={handleTimeUp} 
                    isActive={gameState === 'playing'} 
                  />
                </div>
                
                <Question 
                  question={question.question} 
                  category={question.category} 
                  difficulty={question.difficulty} 
                />
                
                <div className="mt-4">
                  <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                    Your Answer
                  </label>
                  <input
                    type="text"
                    id="answer"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here"
                  />
                </div>
                
                <button
                  onClick={submitAnswer}
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {(gameState === 'answered' || gameState === 'finished') && (
              <div className="mt-8">
                {message && (
                  <div className={`p-3 rounded-md mb-4 ${message.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                  </div>
                )}
                
                <button
                  onClick={playAgain}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Play Again
                </button>
              </div>
            )}

            {leaderboard.length > 0 && (
              <div className="mt-8">
                <Leaderboard scores={leaderboard} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
