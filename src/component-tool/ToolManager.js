import { displayDate } from "toolbox/DateDisplayer";
import { Link } from "react-router-dom";
import { useState } from "react";

export const [X_MIN_TOOLSIZE, Y_MIN_TOOLSIZE, X_MAX_TOOLSIZE, Y_MAX_TOOLSIZE] = [500, 300, 1500, 1500]

export default function ToolManager({
    index, tool = {name : "", xToolSize : X_MIN_TOOLSIZE, yToolSize : Y_MIN_TOOLSIZE}, state,
    onManage = f => f, onCancel = f => f
}) {
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    const [nowName, setNowName] = useState(tool.name);
    const [nowXToolSize, setNowXToolSize] = useState(tool.xToolSize);
    const [nowYToolSize, setNowYToolSize] = useState(tool.yToolSize);

    function minmax(value, minVal, maxVal) {
        return value > minVal 
        ? value < maxVal 
            ? value
            : maxVal
        : minVal
    }

    return <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
        <td>
            <input type="text"
                placeholder="툴 이름을 입력하세요"
                maxLength={30}
                value={nowName}
                onChange={e => setNowName(e.target.value)}
            />
        </td>
        <td>
            <input type="number"
                min={X_MIN_TOOLSIZE} max={X_MAX_TOOLSIZE}
                value={nowXToolSize}
                onChange={e => setNowXToolSize(e.target.value)}
                onBlur={e => setNowXToolSize(minmax(e.target.value, X_MIN_TOOLSIZE, X_MAX_TOOLSIZE))}
            />
            {" X "}
            <input type="number"
                min={Y_MIN_TOOLSIZE} max={Y_MAX_TOOLSIZE}
                value={nowYToolSize}
                onChange={e => setNowYToolSize(e.target.value)}
                onBlur={e => setNowYToolSize(minmax(e.target.value, Y_MIN_TOOLSIZE, Y_MAX_TOOLSIZE))}
            />
        </td>
        <td></td>
        <td>
            <button onClick={() => {
                console.log("원래 툴은 이거였어", tool)
                // 왜 자바 프로퍼티명은 xToolSize인데 받는 건 xtoolSize로 받음? 어이없어 정말
                console.log("지금부터 이걸로 변경을 시도한다", {...tool, name : nowName, xtoolSize : Number(nowXToolSize), ytoolSize : Number(nowYToolSize)})
                onManage({...tool, name : nowName, xtoolSize : Number(nowXToolSize), ytoolSize : Number(nowYToolSize)})
            }}>
                저장
            </button>
            {" : "}
            <button onClick={() => {console.log("취소가 먼저거든?"); onCancel(index)}}>취소</button>
        </td>
    </tr>
}
