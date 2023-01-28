import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-5xl font-mono text-center tracking-widest text-cyan-400 drop-shadow-xl shadow-white brightness-200
         p-4 animate-pulse transition-colors '>Tic Tac Toe</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
