//@ts-ignore
// @ts-nocheck
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './page/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
