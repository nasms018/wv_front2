import {React} from "react";
import ToolButton from "./ToolButton";

export default function ObjectAddress({toolset = [], onSelect = f => f}) {

    console.log("모든 툴들은 이렇게 나왔습니다", toolset)

    return <div>
        {toolset.map(tool => {
            return <li>
                <ToolButton tool={tool} onSelect={onSelect}>{tool.name}</ToolButton>
            </li>
        })}
    </div>
}