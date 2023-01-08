import React, { useRef } from 'react'
import { TfiControlForward } from "react-icons/tfi";
import { Codeblock } from '../Codeblock/Codeblock';
import './Collapsible.css'
import Card from '../Card/Card';

const Collapsible = ({ props, index, setActive, setEdit, output }) => {
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    console.log("Collapsible Rendered: " + renderCounter.current)
    const handleClick = event => {
        setActive(props.Name, event.currentTarget.id)
    }
    const handleChange = (value) => {
        setEdit(value)
    };
    return (
        <div className="accordian">
            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>

                <div
                    className={index.find(o => o.name === props.Name).active ? "button button--loading cb" : "button"}
                    id={props.Name}
                    onClick={handleClick}
                >
                    <div className="button__text">
                        <TfiControlForward style={{ fontSize: '24px' }} />
                    </div>
                </div>
                <h2>_{props.Name}</h2>
            </div>
            {
                Object.keys(props.Commands).map((subHead) => {
                    if (subHead === "Change Directory") return null
                    let subStatus = index.find(o => o.name === subHead).active
                    return (
                        <div className="contentBx" key={subHead} >
                            <div
                                className="label"
                                onClick={handleClick}
                                style={index.find(o => o.name === subHead).active ? { content: '-' } : { content: "+" }}
                                id={subHead}
                            >{subHead}</div>
                            {subStatus ?
                                props.Commands[subHead].map((command) => {
                                    let cmdStatus = index.find(o => o.name === command).active
                                    // console.log(typeof output[0])
                                    let val = output.find(o => o.name === command).value
                                    return (
                                        <div className="content" key={command}>
                                            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                                <div
                                                    className={cmdStatus ? "button button--loading cb" : "button"}
                                                    id={command}
                                                    onClick={handleClick}
                                                >
                                                    <div className="button__text">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                    </div>
                                                </div>
                                                <Codeblock language="language-console hljs language-shell" content={command} onChange={handleChange} />
                                            </div>
                                            {
                                                val ?
                                                    <Card content={val} />
                                                    : null
                                            }
                                        </div>
                                    );
                                }) : null
                            }
                        </div>
                    );
                })
            }
        </div >
    )
}
export default Collapsible