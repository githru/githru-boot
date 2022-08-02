import React from 'react';
import './App.css';
import TimeSeries from './TimeSeries';

function App() {
  return (
    <div id="App">
      <div className="row">
        <TimeSeries height={400} width={400}/>
      </div>
    </div>
  );
}

export default App;
