import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const labels = [
  'hp',
  'attack',
  'special-attack',
  'special-defense',
  'defense',
  'speed',
];

const data = {
  labels,
  datasets: [
    {
      label: 'stack',
      data: [35, 55, 50, 50, 40, 90],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

function RadarComponent() {
  return (
    <div className='chart'>
      <Radar data={data} />
    </div>
  );
}

export default RadarComponent;
