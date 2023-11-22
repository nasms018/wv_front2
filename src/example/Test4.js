import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useEffect } from 'react';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";

export default function Test4() {
    const TOOL_DETAILS_URL = "/tool/getToolById/";
    const lookUpId = useRef();

    const [nowName, setNowName] = useState("")

    const [xToolSize, setXToolSize] = useState(500)
    const [yToolSize, setYToolSize] = useState(500)

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

    function lookUp(id) {
        let uri = TOOL_DETAILS_URL + id
        axios.post(uri, ).then(response => response.json())
            .then((resData) => {
                console.log("지금 나왔다", resData)
                setNowName(resData?.name)
                setXToolSize(resData?.xToolSize)
                setYToolSize(resData?.yToolSize)
                setInitVertices([...resData?.customEntityList]
                    .map((entity) => { return { ...entity, key: entity.id } })
                )
                setInitEdges([...resData?.customRelationList]
                    .map((relation) => { return { ...relation, key: relation.id } })
                )
                setNowVertices([...resData?.customEntityList]
                    .map((entity) => { return { ...entity, key: entity.id } })
                )
                setNowEdges([...resData?.customRelationList]
                    .map((relation) => { return { ...relation, key: relation.id } })
                )
                setNowObjectList([...resData?.customEntityList, ...resData?.customRelationList]
                    .map((obj) => { return { key: obj.id, id: obj.id, name : obj.name, customPropertiesList : obj.customPropertiesList } })
                )
            })
            .catch(() => {
            });
    }

    console.log("지금 뭐라고?", nowName)

    return <>
        테스트4
        <br />
        <input ref={lookUpId} type="text" placeholder='조회할 툴 ID' />
        <button onClick={() => lookUp(lookUpId.current.value)}>조회하기</button>
        <br />
        <ToolDetail name={nowName}
            xToolSize={xToolSize} yToolSize={yToolSize}
            initVertices={initVertices} setInitVertices={setInitVertices}
            nowVertices={nowVertices} setNowVertices={setNowVertices}
            initEdges={initEdges} setInitEdges={setInitEdges}
            nowEdges={nowEdges} setNowEdges={setNowEdges}
            nowObjectList={nowObjectList} setNowObjectList={setNowObjectList}
            setXToolSize={setXToolSize} setYToolSize={setYToolSize}
            onSummonObject={onSummonObject} onDeleteAllObjects={onDeleteAllObjects} onUpdate={onUpdate}
        />
    </>
}
