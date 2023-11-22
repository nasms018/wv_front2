import { displayDate } from "toolbox/DateDisplayer";
import { Link } from "react-router-dom";

export default function ToolSkin({ tool, state, onClick = f => f, onLink = f => f }) {
    const TABLE_STYLE = {
        width: "100%",
        border: "1px solid",
        borderCollapse: "collapse"
    }

    return <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
        <td onClick={() => onClick(tool)}>{tool.name}</td>
        <td onClick={() => onClick(tool)}>{tool.xToolSize + " X " + tool.yToolSize}</td>
        <td onClick={() => onClick(tool)}>{displayDate(tool.regDt, tool.uptDt)}</td>
        <td>
            <Link to={`/series/${state.seriesId}/tool/${tool.id}`}
                state={{ writer : state.writer, seriesId: state.seriesId, page: 1, toolId: tool.id, addr: state.addr + tool.name + "/" }}
            >
                <button onClick={onLink}>하위 툴</button>
            </Link>
            {" : "}
            <Link to={`/series/${state.seriesId}/tool/${tool.id}/view`}
                state={{ writer : state.writer, seriesId: state.seriesId, page: state.page, toolId: tool.id, addr: state.addr,
                    tool: tool}}
            >
                <button>펼쳐보기</button>
            </Link>
        </td>
    </tr>
}
