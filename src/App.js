import React from 'react';
import './App.css';
import Chess from './chess/Chess';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li><a href="#section1">Chess</a></li>
          <li><a href="#section2">Race Car</a></li>
          <li><a href="#section3">Wumpus World</a></li>
        </ul>
      </header>
      <section id="section1">
        <h2>Chess</h2>
        <Chess />
        <p>This will be a fully functioning chess game.</p>
      </section>

      <section id="section2">
        <h2>Race Car</h2>
        <p>Visual demonstration on Reinforcement Learning Race Car</p>
      </section>

      <section id="section3">
        <h2>Wumpus World</h2>
        <p>Visual demonstration of Wumpus World logic</p>
      </section>
    </div>
  );
}

export default App;
