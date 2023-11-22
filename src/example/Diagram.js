import { useRef, useState, useEffect, useContext } from "react"


export default function Diagram() {


    const lookUpId = useRef();

    const canvasRef = useRef();

    const GRAPH_DIAGRAM_URL = "/tool/anonymous/getToolById/"

    const [customEntityList, setCustomEntityList] = useState([]);
    const [customRelationList, setCustomRelationList] = useState([]);
    const [nowXToolSize, setNowXToolSize] = useState(0);
    const [nowYToolSize, setNowYToolSize] = useState(0);
    const [selectedId, setSelectedId] = useState("");

    function lookUp(id) {
        let uri = GRAPH_DIAGRAM_URL + id
        fetch(uri).then(response => response.json())
            .then((resData) => {
                console.log(resData)
                let entities = [...(resData.customEntityList)]
                let relations = [...(resData.customRelationList)]
                setCustomEntityList(entities)
                setCustomRelationList(relations)
                setNowXToolSize(resData.xToolSize)
                setNowYToolSize(resData.yToolSize)
            })
            .catch(() => {
                setCustomEntityList([])
                setCustomRelationList([])
            }
        );
    }

    function Graph({vertices = [], edges = [], width = 1024, height = 768}) {
        console.log("지금 이걸 그리고 있습니다", vertices, edges)

        let ctx = canvasRef.current?.getContext("2d")
        // 툴이 움직이면 일단 리셋
        ctx?.reset();
        ctx?.beginPath();
        if (vertices && edges) {
            console.log("관계 나와라 얍!", edges)
            edges.forEach(relation => {
                let [oneCenterX, oneCenterY] =
                    [relation.one.xPos + relation.one.xSize / 2, relation.one.yPos + relation.one.ySize / 2]
                let [otherCenterX, otherCenterY] =
                    [relation.other.xPos + relation.other.xSize / 2, relation.other.yPos + relation.other.ySize / 2]
                let [fartherX, fartherY] =
                    [relation.xPos, relation.yPos]
                let [controlX, controlY] =
                    [2 * fartherX - (oneCenterX + otherCenterX) / 2, 2 * fartherY - (oneCenterY + otherCenterY) / 2]
                ctx.moveTo(otherCenterX, otherCenterY)
                ctx.quadraticCurveTo(controlX, controlY, oneCenterX, oneCenterY)
                ctx.stroke();
            })
        }

        return <>
            {vertices.length > 0 ? vertices.map(entity =>
                // 크기에 맞게 버튼 생성
                <button //onClick = 어쩌구 위치
                    style={{position: "absolute", // 위치의 절대화
                        left:entity.xPos, top:entity.yPos,
                        width:entity.xSize, height:entity.ySize,
                        backgroundColor:entity.innerColor, borderColor:entity.outerColor
                    }}
                    onDragStart={() => {setSelectedId(entity.id)}}
                    onDragEnd={(e) => {
                        setSelectedId(entity.id)
                    }}
                    draggable
                >
                    {entity.name}
                </button>
            ) : ""}
            {edges.length > 0 ? edges.map(relation =>
                // 크기에 맞게 버튼 생성
                <button //onClick = 어쩌구 위치
                    style={{position: "absolute", // 위치의 절대화
                        left:relation.xPos - relation.xSize / 2, top:relation.yPos - relation.ySize / 2,
                        width:relation.xSize, height:relation.ySize,
                        backgroundColor:relation.innerColor, borderColor:relation.outerColor
                    }}
                    onDragStart={() => {setSelectedId(relation.id)}}
                    onDragEnd={(e) => {
                        setSelectedId(relation.id)
                    }}
                    draggable
                >
                    {relation.name}
                </button>
            ) : ""}
        </>
    }
    
    return <>
        <input ref={lookUpId} type="text" placeholder='툴 ID'/>
        <button onClick={e => lookUp(lookUpId.current.value)}>조회하기</button>
        {customEntityList && customRelationList 
        ? <>
            <br/><br/>
            <div style={{position: "relative", width:nowXToolSize, height:nowXToolSize, margin: "0 auto"}}>
                <canvas ref={canvasRef} style={{border : "1px dotted"}} width={nowXToolSize} height={nowYToolSize}/>
                <Graph vertices={customEntityList} edges={customRelationList}/>
            </div>
        </>
        : <p>{"(선택된 툴이 없습니다)"}</p>
        }
    </>
}