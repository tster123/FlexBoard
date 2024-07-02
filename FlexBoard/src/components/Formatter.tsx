import React from "react";
import { FC } from "react";

export interface IFormatterProps
{
    format: IFormat[];
}

export interface IFormat
{
    isPlaceholder: boolean | undefined;
    text: string | undefined;
    tag: string | undefined;
    props: object | undefined;
    children: IFormat[] | undefined;
    href: string | undefined;
}

const Formatter : FC<React.PropsWithChildren<IFormatterProps>> = (props): JSX.Element => {
    
    const renderOne = (format: IFormat, index: number) => {
        if (format.isPlaceholder) {
            return props.children;
        }
        else if (format.text != undefined && format.text != null) {
            if (format.href == undefined) {
                return <React.Fragment key={index}>{format.text}</React.Fragment>
            }
            else {
                return <a key={index} href={format.href}>{format.text}</a>;
            }
        }
        else if (format.tag == "div") {
            return <div key={index} {...format.props}>{format.children?.map((c, i) => renderOne(c, i))}</div>
        }
        else if (format.tag == "span") {
            return <span key={index} {...format.props}>{format.children?.map((c, i) => renderOne(c, i))}</span>
        }
        else {
            throw "unsupporeted tag; " + format.tag;
        }
        // TODO: support more
    };
    
    return <>
    {props.format.map((f, i) => renderOne(f, i))}
    </>;
}

export default Formatter;
