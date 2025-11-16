import { useState, useEffect, ChangeEvent } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function App() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeName, setHomeName] = useState('HOME');
  const [awayName, setAwayName] = useState('AWAY');
  const [time, setTime] = useState(720); // 12 minutes in seconds (1 quarter)
  const [isRunning, setIsRunning] = useState(false);
  const [period, setPeriod] = useState(1);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetGame = () => {
    setHomeScore(0);
    setAwayScore(0);
    setTime(720);
    setIsRunning(false);
    setPeriod(1);
  };

  const addPoints = (team: 'home' | 'away', points: number) => {
    if (team === 'home') {
      setHomeScore(homeScore + points);
    } else {
      setAwayScore(awayScore + points);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/70 p-3 text-center border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-wider text-orange-400 uppercase">Basketball Scoreboard</h1>
        </div>

        {/* Main Score Display */}
        <div className="grid grid-cols-3 items-start">
          {/* Away Team */}
          <div className="text-center p-6 space-y-4 border-r border-slate-700">
            <input
              type="text"
              value={awayName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAwayName(e.target.value.toUpperCase())}
              className="w-full bg-transparent text-3xl font-bold text-center tracking-wider uppercase focus:outline-none focus:bg-slate-700/50 rounded-md py-1"
              maxLength={10}
            />
            <div className="text-8xl font-mono font-bold text-red-500 tabular-nums tracking-tighter py-4">
              {awayScore.toString().padStart(2, '0')}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => addPoints('away', 1)} className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">+1</button>
              <button onClick={() => addPoints('away', 2)} className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">+2</button>
              <button onClick={() => addPoints('away', 3)} className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">+3</button>
            </div>
            <button
              onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
              className="w-full py-2 bg-red-900/50 text-red-300 rounded-md hover:bg-red-900 transition-colors"
            >
              -1
            </button>
          </div>

          {/* Center - Timer & Period */}
          <div className="text-center p-6 space-y-6 flex flex-col justify-start items-center">
            <div className="w-full">
              <div className="text-xl font-semibold text-slate-400 tracking-wider mb-2">PERIOD</div>
              <div className="text-6xl font-bold text-slate-200">{period}</div>
            </div>
            <div className="w-full h-px bg-slate-700"></div>
            <div className="w-full">
              <div className="text-7xl font-mono font-bold text-orange-400 tabular-nums tracking-tighter">
                {formatTime(time)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`py-3 rounded-md transition-colors ${
                  isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'
                }`}
                disabled={time === 0}
              >
                {isRunning ? <Pause className="size-5 mx-auto" /> : <Play className="size-5 mx-auto" />}
              </button>
              <button
                onClick={() => setTime(720)}
                className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors"
              >
                Reset Time
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={() => setPeriod(Math.max(1, period - 1))}
                className="py-2 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors"
              >
                Q-
              </button>
              <button
                onClick={() => setPeriod(period + 1)}
                className="py-2 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors"
              >
                Q+
              </button>
            </div>
          </div>

          {/* Home Team */}
          <div className="text-center p-6 space-y-4 border-l border-slate-700">
            <input
              type="text"
              value={homeName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setHomeName(e.target.value.toUpperCase())}
              className="w-full bg-transparent text-3xl font-bold text-center tracking-wider uppercase focus:outline-none focus:bg-slate-700/50 rounded-md py-1"
              maxLength={10}
            />
            <div className="text-8xl font-mono font-bold text-blue-500 tabular-nums tracking-tighter py-4">
              {homeScore.toString().padStart(2, '0')}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => addPoints('home', 1)} className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">+1</button>
              <button onClick={() => addPoints('home', 2)} className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">+2</button>
              <button onClick={() => addPoints('home', 3)} className="py-3 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">+3</button>
            </div>
            <button
              onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
              className="w-full py-2 bg-blue-900/50 text-blue-300 rounded-md hover:bg-blue-900 transition-colors"
            >
              -1
            </button>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="bg-slate-900/70 p-3 flex justify-center border-t border-slate-700">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-2 bg-orange-800/60 text-orange-300 rounded-md hover:bg-orange-800 transition-colors"
          >
            <RotateCcw className="size-4" />
            <span>Reset Game</span>
          </button>
        </div>
      </div>
    </div>
  );
}
