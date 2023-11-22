import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ToolManager from "./ToolManager";
import ToolSkin from "./ToolSkin";
import { Table, Button } from 'react-bootstrap';
import { Pagination } from "react-bootstrap";
import { displayPagination } from "toolbox/Pagination";
import Remocon from "toolbox/Remocon";
import {X_MIN_TOOLSIZE, Y_MIN_TOOLSIZE} from "./ToolManager"

export default function ToolTable({
    data, state, param,
    setToolListUri = f => f, buildUrl = f => f,
    setData = f => f, manageToolSkin = f => f, deleteToolSkin = f => f }) {

    console.log("상태 좀 보여줘", state)
    console.log("그래서 뭘 테이블로 만들면 돼?", data)

    const address = `Tool:/${state?.addr}`

    const [nowFunc, setNowFunc] = useState(0)
    const [nowFuncName, setNowFuncName] = useState("선택")

    const [selectedId, setSelectedId] = useState()

    const DEFAULT_SKIN = {
        customEntityList : [],
        customRelationList : [],
        id : state?.toolId + "----",
        isEditing : true,
        name : "",
        writer : state?.writer,
        parentId : state?.seriesId,
        xToolSize : X_MIN_TOOLSIZE,
        yToolSize : Y_MIN_TOOLSIZE,
        isCreating : true,
        isSafe : false
    }

    function onDetermine(index, newTool) {
        let newData = [...data.firstVal]
        newData[index] = newTool ? { ...newTool, isEditing: false } : { ...newData[index], isEditing: false }
        console.log("네 결심을 보여줘!", newData)
        setNowFunc(1)
        setNowFuncName("선택")
    }

    function onManage(index, newTool) {
        console.log("저장하려는 데이터는?", newTool)
        onDetermine(index, newTool)
        if (checkQuality(newTool)) {
            manageToolSkin(newTool, index, newTool.isCreating)
        }
        else {
            alert("툴 이름이 없습니다!")
        }
    }

    function checkQuality(toolSkin) {
        return toolSkin?.name
    }

    function onCancel(index) {
        let newData = [...data.firstVal]
        console.log("지금 뭘 취소하려는 거야?", newData, index, newData[index])
        if (newData[index].isCreating) {
            newData = newData.slice(1, newData.length)
        }
        else {
            newData[index].isEditing = false
        }
        setData({ ...data, firstVal: newData })
        onDetermine(index)
        
    }

    function onSelect(index, name) {
        setNowFunc(index)
        setNowFuncName(name)
        setSelectedId()
    }

    function onExecute(tool, index) {
        let newData = [...data.firstVal]
        switch (nowFuncName) {
            case "수정":
                newData[index].isEditing = true
                setData({ ...data, firstVal: newData })
                break
            case "삭제":
                console.log("지금부터 여기 있는 애 삭제할 거야", index)
                console.log("걔 아이디가 이렇게 생겼어", newData[index].id)
                deleteToolSkin(newData[index].id)
            default:
        }
    }

    function onCreate(index, name) {
        let newData = [...data.firstVal]
        switch (name) {
            case "생성":
                newData.unshift({...DEFAULT_SKIN})
                setData({ ...data, firstVal: newData })
                break
            default:
        }
    }

    const TABLE_STYLE = {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

    const ADDRESS_STYLE = {
        backgroundColor: "#526290",
        color: "#ffffcc"
    }

    console.log("툴들 보여줘!", data)
    const toolset = data?.firstVal;
    const pagenation = data?.secondVal;

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr><th colSpan={4} style={{ ...TABLE_STYLE, textAlign: "left", ...ADDRESS_STYLE }}> ★ {address}</th></tr>
            <tr><td colSpan={4} style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <Remocon index={nowFunc} writer={state?.writer} type="xpl" onSelect={onSelect} immediate={onCreate} />
            </td></tr>
            <tr><td colSpan={4} style={{ ...TABLE_STYLE }}>
                <div style={{ display: "inline-block" }}>
                    <Pagination>
                        {pagenation?.lastPage >= 2
                            ? <>{displayPagination(pagenation, state, setToolListUri, buildUrl)}<br /></>
                            : ""}
                    </Pagination>
                </div>
            </td></tr>
            <tr style={{ ...TABLE_STYLE, textAlign: "center", }}>
                <th>이름</th>
                <th>크기</th>
                <th>수정시간</th>
                <th></th>
            </tr>
        </thead>
        {toolset && toolset.length > 0
            ? toolset.map((tool, index) =>
                tool.isEditing
                    ? <ToolManager key={index}
                        index={index}
                        tool={tool}
                        state={state}
                        onManage={(newTool) => onManage(index, newTool)}
                        onCancel={onCancel}
                    />
                    : <ToolSkin key={index}
                        tool={tool}
                        state={state}
                        onClick={tool => onExecute(tool, index)}
                        onLink={() => {
                            state.addr = tool.name;
                            setToolListUri(buildUrl())
                        }}
                    />
            ) : <tr style={{ ...TABLE_STYLE, textAlign: "center" }}>
                <td colSpan={4}>{"(이 위치에는 선택 가능한 툴이 존재하지 않습니다.)"}</td>
            </tr>}
    </Table>
}