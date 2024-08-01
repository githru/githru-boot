import RadarComponent from './radar';
import Pikachu from './Pikachu.png';
import './App.css'

function App() {
  return (
    <>
      <div className="container">
        <img src={Pikachu} alt="Pikachu image" />
        <RadarComponent />
      </div>
    </>
  );
}

export default App;
