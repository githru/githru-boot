import RadarComponent from './radar';
import Pikachu from './Pikachu.png';
import './App.css';

function App() {
  return (
    <div className="container">
      <img src={Pikachu} alt="Pikachu image" />
      <div className="chartContainer">
        <h1>피카츄</h1>
        <RadarComponent />
        <ul>
          <li>
            <p>분류</p>쥐 포켓몬
          </li>
          <hr />
          <li>
            <p>신장</p>0.4m
          </li>
          <hr />
          <li>
            <p>체중</p>6.0kg
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
