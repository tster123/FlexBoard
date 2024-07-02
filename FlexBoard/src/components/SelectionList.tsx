import { FC } from "react";

interface SolectionListProps
{
    inputs: string[];
    selected: string;
    setSelected: (s: string) => void;
}

const SelectionList : FC<SolectionListProps> = (props): JSX.Element => {

    const prefix = props.inputs.join(' ');
    for (let i = 0; i < props.inputs.length; i++)
    {
        const s = props.inputs[i];
        if (s === undefined || s === null || s === "")
        {
            return (<>Waiting for load</>)   
        }
    }
  return (
    <div>
      <p><b>Items</b></p>
      <ul>
        {["Foo", "Mork", "Pickle"].map((w) =>
            <li key={w} onMouseDown={() => props.setSelected(prefix + w)} className={prefix + w === props.selected ? "selected" : ""}>{prefix + w}</li>
        )}
      </ul>
    </div>
  )
}

export default SelectionList
