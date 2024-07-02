import { SetStateAction, useState } from 'react'
import './App.css'
import SelectionList from './components/SelectionList'
//import { JSX } from 'react/jsx-runtime'

interface IPanelOutput {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}

const usePanelOutput = () : IPanelOutput => {
  const [v, setV] = useState("");
  return {value: v, setValue: setV};
}

function App() {

  const boxConfig = [
    {name: "A", depends: []},
    {name: "B", depends: ["A"]},
    {name: "C", depends: ["A"]},
    {name: "D", depends: ["B", "C"]},
  ]


  const boxes = boxConfig.map((b) => {
    return {
      ...b, 
      ...{
        state: usePanelOutput()
      }
    }
  });

  console.log(boxes);
  const setPanelOutput = (which: string, value: string) : void => {
    const box = boxes.find((b) => b.name === which);
    box?.state.setValue(value);
    boxes.forEach(b => {
      if (b.depends.findIndex(b2 => b2 === which) >= 0) {
        b.state.setValue("");
      }
    });
  }

  return (
    <>
      {boxes.map(box =>
        <div key={box.name} className='box'>
          <p>{box.name}</p>
          <SelectionList inputs={boxes.filter(b => box.depends.includes(b.name)).map(b => b.state.value)} selected={box.state.value} setSelected={(val) => setPanelOutput(box.name, val)} />
        </div>
      )}
    </>);
}

export default App
