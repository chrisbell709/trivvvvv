import { useEffect } from 'react';

export default function Timer({ seconds, setSeconds, onTimeUp, isActive }) {
  useEffect(() => {
    let interval = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      onTimeUp();
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds, setSeconds, onTimeUp]);

  return (
    <div className={`px-3 py-1 rounded-full ${seconds <= 10 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
      Time: {seconds}s
    </div>
  );
}
