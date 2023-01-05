import React, { useRef } from 'react'
import { TfiControlForward } from "react-icons/tfi";
import { Codeblock } from '../Codeblock/Codeblock';
import './Collapsible.css'

const Collapsible = ({ props, index, setActive }) => {
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    console.log("Collapsible Rendered: " + renderCounter.current)
    const handleClick = event => {
        setActive(props.Name, event.currentTarget.id)
    }
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
                    return (
                        // <ContentBox props={props} subHead={subHead} key={subHead} />
                        <div className="contentBx" key={subHead} >
                            <div
                                className="label"
                                onClick={handleClick}
                                style={index.find(o => o.name === subHead).active ? { content: '-' } : { content: "+" }}
                                id={subHead}
                            >{subHead}</div>
                            {index.find(o => o.name === subHead).active &&
                                props.Commands[subHead].map((command) => {
                                    return (
                                        <div className="content" style={{ display: 'flex', width: '100%', alignItems: 'center' }} key={command}>
                                            <div
                                                className={index.find(o => o.name === command).active ? "button button--loading cb" : "button"}
                                                id={command}
                                                onClick={handleClick}
                                            >
                                                <div className="button__text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                </div>
                                            </div>
                                            <Codeblock language="language-console hljs language-shell" content={command} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div >
    )
}
export default Collapsible