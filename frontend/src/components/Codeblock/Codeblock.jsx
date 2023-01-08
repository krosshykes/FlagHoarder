import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/base16/classic-light.css'
import './Codeblock.css'
export function Codeblock(props) {
  const cmd = useRef();
  const { onChange } = props;
  const onMouseUp = () => {
    const value = cmd.current?.value || cmd.current?.innerText;
    onChange(value);
  };
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div style={{ width: '100%', borderRadius: '4px' }}>
      <pre>
        <code
          className={props.language}
          contentEditable="true"
          suppressContentEditableWarning="true"
          ref={cmd}
          onKeyUp={onMouseUp}
        >
          {props.content}</code>
      </pre>
    </div>
  );
}