import { example } from './data/example'
import BarChart from './BarChart';
import LineChart from './LineChart';

export default function App() {

  return (
    <>
      <LineChart data={example}/>
      <BarChart data={example} />
    </>
  )
};