import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import SelectionList from './components/SelectionList'
import Formatter, { IFormat } from './components/Formatter';
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

  const aFormat : IFormat[] = [
    {tag: "div", props: {className:"foo"}, children: [
      {text: "Above A"},
      {isPlaceholder: true}
    ]}
  ];
  const bFormat : IFormat[] = [
    {isPlaceholder: true},
    {text: "After B"}
  ];
  const cFormat : IFormat[] = [
    {isPlaceholder: true},
  ];
  const dFormat : IFormat[] = [
    {text: "Google", href: "www.google.com"},
    {tag: "div", props: {className:"outer"}, children: [
      {tag: "div", props: {className:"middle"}, children: [
        {isPlaceholder: true},
        {text: "After D"},
      ]},
      {text:"After D Again"},
  ]}];

  const boxConfig = [
    {name: "A", depends: [], format: aFormat},
    {name: "B", depends: ["A"], format: bFormat},
    {name: "C", depends: ["A"], format: cFormat},
    {name: "D", depends: ["B", "C"], format: dFormat},
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
// <SelectionList inputs={boxes.filter(b => box.depends.includes(b.name)).map(b => b.state.value)} selected={box.state.value} setSelected={(val) => setPanelOutput(box.name, val)} />

useEffect(() => {
document.addEventListener("click", () => {
  console.log("click!");
    boxes.forEach(b => {
      const panel = document.getElementById('__PANEL_' + b.name);
      const placeholder = document.getElementById('__PLACEHOLDER_' + b.name);
      if (panel != null) placeholder?.before(panel);
    });
  });
}, []);

  return (
    <>
      {boxes.map(box => {
        return <div key={box.name} className='box'>
          <p>{box.name}</p>
          <Formatter format={box.format} key={box.name}>
            <SelectionList inputs={boxes.filter(b => box.depends.includes(b.name)).map(b => b.state.value)} selected={box.state.value} setSelected={(val) => setPanelOutput(box.name, val)} />
          </Formatter>
        </div>
      })}
    </>);
}

export default App
