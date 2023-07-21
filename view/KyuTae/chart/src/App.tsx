import {useState} from 'react'
import LineChart from './component/LineChart'
import BarChart from './component/BarChart'
import "./App.css"

function App() {
  const [LineClass,setLineClas] = useState<string>("TrueType");
  const [BarClass,setBarClass] = useState<string>("FalseType");
  const btnClik = () =>{
      if(LineClass==="TrueType"){
        setLineClas(()=>"FalseType")
        setBarClass(()=>"TrueType")
      }
      else{
        setLineClas(()=>"TrueType")
        setBarClass(()=>"FalseType")
      }
  }
  return (
    <div className="main_container">
      <div className='main_box'>
        <span className="main_title">삼성전자 2023년도 1월 ~ 6월 주식 종가</span>
        <button className="main_btn" onClick={btnClik}>CHANGE</button>
      </div>
      <LineChart classType={LineClass}/>
      <BarChart classType={BarClass}/>
    </div>
  )
}

export default App