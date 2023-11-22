import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useContext, createContext, useMemo } from 'react';
import AppContext from "context/AppContextProvider";
import axios from 'api/axios';

const ToolContext = createContext({});

export const ToolContextProvider = ({ children }) => {

    const SAVE_TOOL_URL = "/tool/saveToolDetails/"

    const [nowName, setNowName] = useState("")

    const [defaultObject, setDefaultObject] = useState(
        {name : "", innerColor : "#f0f0f0", outerColor : "#000000", textColor : "#000000"}
    )

    const [xToolSize, setXToolSize] = useState(500)
    const [yToolSize, setYToolSize] = useState(500)
    const [initXToolSize, setInitXToolSize] = useState(500)
    const [initYToolSize, setInitYToolSize] = useState(500)

    const [initVertices, setInitVertices] = useState([])
    const [initEdges, setInitEdges] = useState([])

    const [nowVertices, setNowVertices] = useState([])
    const [nowEdges, setNowEdges] = useState([])

    const [nowObjectList, setNowObjectList] = useState([])

    function onSummonObject(entityArray, relationArray) {
        setNowObjectList([...entityArray, ...relationArray])
    }

    function onDeleteAllObjects(deleteIdArray) {
        console.log("누구를 삭제한다고?", deleteIdArray)
        console.log("어디서 삭제한다고?", nowObjectList)
        setNowObjectList([...nowObjectList].filter(obj => !deleteIdArray.includes(obj.id)))
    }

    function onUpdate(newList, index) {
        console.log("주문하신 물품은?", newList)
        let copyArray = [...nowObjectList]
        console.log("복사 잘 됐니?", copyArray)
        let target = copyArray[index]
        console.log("타겟은?", target)
        target.customPropertiesList = [...newList]
        console.log("잘 바뀌었니?", copyArray)
        findTargetAndSync(target)
        setNowObjectList(copyArray)
    }

    function findTargetAndSync(target) {
        // 타겟의 oneId 있으면 edge 없으면 vertex
        let [targetArray, setTargetArray] =
        target.oneId
            ? [[...nowEdges], setNowEdges]
            : [[...nowVertices], setNowVertices]
        // 타겟 어레이에서 타겟과 아이디가 일치하는 것을 찾아서 제거하고 다시 넣기
        let newTargetArray = targetArray.filter(tgt =>  tgt.id !== target.id)
        newTargetArray.push(target)
        console.log("타겟은 처리했나", newTargetArray)
        setTargetArray(newTargetArray)
    }

    function onSaveTool(id, seriesId, writer, auth) {
        let saveDate = {
            id : id, name : nowName,
            series : {id : seriesId}, writer : writer,
            xtoolSize : xToolSize, ytoolSize : yToolSize,
            customEntityList : nowVertices.map(v => {
                return {...v, xpos : v.xPos, ypos : v.yPos, xsize : v.xSize, ysize : v.ySize}
            }),
            customRelationList : nowEdges.map(e => {
                return {...e, xpos : e.xPos, ypos : e.yPos, xsize : e.xSize, ysize : e.ySize}
            })
        }
        console.log("세관 검사중......", id, writer, auth, saveDate)
        axios.post(SAVE_TOOL_URL, saveDate,
            { headers: {
					'Content-Type': 'application/json',
					"x-auth-token": `Bearer ${auth?.accessToken}`
            }}
        )
    }

    useMemo(() => {
        console.log("너희들 뭐하니?", nowVertices, nowEdges)
    }, [nowVertices, nowEdges])

    return (
        <ToolContext.Provider value={{
            nowName, setNowName,
            xToolSize, setXToolSize, yToolSize, setYToolSize,
            defaultObject, setDefaultObject,
            initVertices, setInitVertices, initEdges, setInitEdges,
            nowVertices, setNowVertices, nowEdges, setNowEdges,
            initXToolSize, setInitXToolSize,
            initYToolSize, setInitYToolSize,
            nowObjectList, setNowObjectList,
            onSummonObject, onDeleteAllObjects,
            onUpdate, onSaveTool
        }}>
            {children}
        </ToolContext.Provider>
    )
}

export default ToolContext;