import React, {useRef} from 'react';

export default function PropTest({level, propType, propVal, setType = f => f, setVal = f => f}) {

    const textRef = useRef();

    return <>
        <input style={{verticalAlign : "top", width : "128px"}}
            type="text"
            maxLength={30}
            value={propType}
            onChange={e => setType(level, e.target.value)}
		    required
        />
        {" : "}
        <textarea ref={textRef}
            style={{verticalAlign : "top", width : "256px", resize : "none"}}
            rows={3}
            value={propVal}
            onChange={e => setVal(level, e.target.value)}
            maxLength={255}
        />
    </>
}