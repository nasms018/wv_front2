import { useState, useEffect } from "react"

export default function CustomProperty({propType, propVal, onBlur = f => f}) {

    const [type, setType] = useState(propType);
    const [val, setVal] = useState(propVal);

    useEffect(() => console.log("대체 넌 뭐냐고", type), [type])

    return <>
        <input style={{verticalAlign : "top", width : "128px"}}
            type="text"
            maxLength={30}
            value={type}
            onChange={(e) => setType(e.target.value)}
			required
            onBlur={onBlur}
        />
        {" : "}
        <textarea style={{verticalAlign : "top", width : "256px"}}
            maxLength={255}
            value={val}
            onChange={(e) => setVal(e.target.value)}
        />
    </>
}