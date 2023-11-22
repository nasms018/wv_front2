import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useEffect, useContext } from 'react';
import { AxiosAuth } from 'toolbox/Fetch';
import { useLocation } from "react-router";
import AppContext from "context/AppContextProvider";

export default function ToolControler({tool}) {
    const { auth } = useContext(AppContext);

    const [nowName, setNowName] = useState(tool?.name)

    const [xToolSize, setXToolSize] = useState(tool?.xToolSize)
    const [yToolSize, setYToolSize] = useState(tool?.yToolSize)

    const [initVertices, setInitVertices] = useState([])
    const [initEdges, setInitEdges] = useState([])

    const [nowVertices, setNowVertices] = useState([])
    const [nowEdges, setNowEdges] = useState([])

    const [nowObjectList, setNowObjectList] = useState([])

    function onSummonObject(customObject) {
        console.log("오브젝트 소환!", customObject)
        setNowObjectList([...nowObjectList, customObject])
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
        copyArray[index].customPropertiesList = [...newList]
        console.log("잘 바뀌었니?", copyArray)
        setNowObjectList(copyArray)
    }

    return <ToolDetail name={nowName}
        xToolSize={xToolSize} yToolSize={yToolSize}
        initVertices={initVertices} setInitVertices={setInitVertices}
        nowVertices={nowVertices} setNowVertices={setNowVertices}
        initEdges={initEdges} setInitEdges={setInitEdges}
        nowEdges={nowEdges} setNowEdges={setNowEdges}
        nowObjectList={nowObjectList} setNowObjectList={setNowObjectList}
        setXToolSize={setXToolSize} setYToolSize={setYToolSize}
        onSummonObject={onSummonObject} onDeleteAllObjects={onDeleteAllObjects} onUpdate={onUpdate}
    />
}