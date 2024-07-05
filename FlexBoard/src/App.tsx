import { useState } from 'react'
import './App.css'
import SelectionList from './components/SelectionList'
import Formatter, { IFormat } from './components/Formatter';
//import { JSX } from 'react/jsx-runtime'

function App() {

  const aFormat : IFormat[] = [
    {tag: "div", props: {className:"foo"}, children: [
      {text: "Above A", tag:undefined, href:undefined, props:undefined, placeholder:undefined, children:undefined},
      {placeholder: "panel", tag:undefined, href:undefined, props:undefined, children:undefined, text:undefined}
    ], href:undefined, placeholder:undefined, text:undefined}
  ];
  const bFormat : IFormat[] = [
    {tag:undefined, href:undefined, props:undefined, placeholder:"panel", children:undefined, text:undefined},
    {text: "After B", tag:undefined, href:undefined, props:undefined, placeholder:undefined, children:undefined}
  ];
  const cFormat : IFormat[] = [
    {placeholder: "panel", tag:undefined, href:undefined, props:undefined, children:undefined, text:undefined},
  ];
  const dFormat : IFormat[] = [
    {text: "Google", href: "www.google.com", tag:undefined, props:undefined, placeholder:undefined, children:undefined},
    {tag: "div", props: {className:"outer"}, placeholder:undefined, text:undefined, href:undefined, children: [
      {tag: "div", props: {className:"middle"}, children: [
        { tag:undefined, href:undefined, props:undefined, placeholder:"panel", children:undefined, text:undefined},
        {text: "After D", tag:undefined, href:undefined, props:undefined, placeholder:undefined, children:undefined},
      ], placeholder:undefined, text:undefined, href: undefined},
      {text:"After D Again", tag:undefined, href:undefined, props:undefined, placeholder:undefined, children:undefined},
  ]}];

  const boxes = [
    {name: "A", depends: [], format: aFormat},
    {name: "B", depends: ["A"], format: bFormat},
    {name: "C", depends: ["A"], format: cFormat},
    {name: "D", depends: ["B", "C"], format: dFormat},
    {name: "E", depends: ["D"], format: cFormat},
  ]

  const basePanelValues : Record<string, string> = {}
  boxes.forEach(panel => {
    basePanelValues[panel.name] = "";
  })

  const [panelValues, setPanelValues] = useState(basePanelValues);

  // fill depends array for all upstream panels
  boxes.forEach(panel => {
    if (panel.depends == null) return;
    const queue = [] as string[];
    panel.depends.forEach(name => queue.push(name));
    while (queue.length > 0) {
      const name = queue.shift();
      const upstreamPanel = boxes.find(p => p.name === name);
      if (upstreamPanel == null) {
        console.error("Cannot find panel [" + name + "]");
        return;
      }
      if (upstreamPanel.depends != null) {
        for (let i = 0; i < upstreamPanel.depends.length; i++) {
          const newName = upstreamPanel.depends[i];
          if (panel.depends.indexOf(newName) < 0) {
            queue.push(newName);
            panel.depends.push(newName);
          }
        }
      }
    }
  });


  console.log(panelValues);
  const setPanelOutput = (which: string, value: string) : void => {
    const obj = {
      ...panelValues,
      [which]: value
    };
    boxes.forEach(b => {
      if (b.depends.findIndex(b2 => b2 === which) >= 0) {
        obj[b.name] = "";
      }
    });
    setPanelValues(obj);
  }

  return (
    <>
      {boxes.map(box => {
        return <div key={box.name} className='box'>
          <p>{box.name}</p>
          <Formatter format={box.format} key={box.name}>
            <SelectionList inputs={boxes.filter(b => box.depends.includes(b.name)).map(b => panelValues[b.name])} selected={panelValues[box.name]} setSelected={(val) => setPanelOutput(box.name, val)} />
          </Formatter>
        </div>
      })}
    </>);
}

export default App
