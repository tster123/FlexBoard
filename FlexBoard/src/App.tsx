import { useState } from 'react'
import './App.css'
import SelectionList from './components/SelectionList'
//import { JSX } from 'react/jsx-runtime'

function App() {
  const [count, setCount] = useState(0)

  const [aVal, setAVal] = useState("");
  const [bVal, setBVal] = useState("");
  const [cVal, setCVal] = useState("");
  const [dVal, setDVal] = useState("");

  const setD = (s: string) => {
    setDVal(s);
  }

  const setC = (s: string) => {
    setD("");
    setCVal(s);
  }

  const setB = (s: string) => {
    setD("");
    setBVal(s);
  }

  const setA = (s: string) => {
    setAVal(s);
    setB("");
    setC("");
  }

  return (
    <>
      <div className='box'>
      <p>A</p>
        <SelectionList inputs={[] as string[]} selected={aVal} setSelected={setA}/>
      </div>
      <div className='box'>
        <p>B</p>
        <SelectionList inputs={[aVal]} selected={bVal} setSelected={setB}/>
      </div>
      <div className='box'>
      <p>C</p>
        <SelectionList inputs={[aVal]} selected={cVal} setSelected={setC}/>
      </div>
      <div className='box'>
      <p>D</p>
        <SelectionList inputs={[bVal, cVal]} selected={dVal} setSelected={setD}/>
      </div>
    </>
  )
}

export default App
