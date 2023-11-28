import { useContext } from 'react';
import ToolContext from './ToolContextProvider';

export default function ObjectEditor({id = "",
    obj = {name : "", innerColor : "#f0f0f0", outerColor : "#000000", textColor : "#000000"},
    onSetup = f => f, onEdit = f => f
}) {
    console.log("무엇을 디자인하실 건가요?", obj);

    return <tr>
        <td>
            <label>이름</label>{" : "}<input type="text"
                value={obj.name}
                onChange={e => {id ? onEdit(e, "name", id) : onSetup(e, "name")}}
            /><br/>
            <label>배경</label>{" : "}<input type="color"
                value={obj.innerColor}
                onChange={e => {id ? onEdit(e, "innerColor", id) : onSetup(e, "innerColor")}}
            />{"  "}
            <label>테두리</label>{" : "}<input type="color"
                value={obj.outerColor}
                onChange={e => {id ? onEdit(e, "outerColor", id) : onSetup(e, "outerColor")}}
            />{"  "}
            <label>글자색</label>{" : "}<input type="color"
                value={obj.textColor}
                onChange={e => {id ? onEdit(e, "textColor", id) : onSetup(e, "textColor")}}
            />
        </td>
    </tr>
}