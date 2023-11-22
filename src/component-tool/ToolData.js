import ToolDetail from 'component-tool/ToolDetail';
import ToolContext from './ToolContextProvider';
import { useContext, useEffect } from 'react';

export default function ToolData({ data }) {
    console.log("데이터는 나와?", data)
    const { nowName, setNowName,
        xToolSize, yToolSize,
        setXToolSize, setYToolSize,
        setInitXToolSize, setInitYToolSize,
        setInitVertices, setInitEdges,
        setNowVertices, setNowEdges,
        setNowObjectList
    } = useContext(ToolContext);

    useEffect(() => {
        let newObjectList = [...data?.customEntityList, ...data?.customRelationList]
        setNowName(data?.name);
        setXToolSize(data?.xToolSize);
        setYToolSize(data?.yToolSize);
        setInitXToolSize(data?.xToolSize);
        setInitYToolSize(data?.yToolSize);
        setInitVertices(data?.customEntityList);
        setNowVertices(data?.customEntityList);
        setInitEdges(data?.customRelationList);
        setNowEdges(data?.customRelationList);
        setNowObjectList(newObjectList)
    }, [])


    return <>
        <h2>{nowName}</h2>
        <p>{xToolSize + " X " + yToolSize}</p>
        <br />
        <ToolDetail />
    </>
}
