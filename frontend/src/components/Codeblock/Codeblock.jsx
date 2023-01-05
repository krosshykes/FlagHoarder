import { React, useEffect } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/base16/classic-light.css'
import './Codeblock.css'
export function Codeblock(props) {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div style={{width:'100%', borderRadius: '4px'}}>
      <pre>
        <code className={props.language}>{props.content}</code>
      </pre>
    </div>
  );
}