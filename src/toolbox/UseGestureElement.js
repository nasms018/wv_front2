import { useDrag } from 'react-use-gesture';

export default function UseGestureElement({ id,
    init, pos, set, type, index, bound, style,
    onMove = f => f, onClick = f => f
}) {

    const bindPos = useDrag((params) => {
        onMove(set, type, index, {
            ...pos,
            xPos: params.offset[0] + init.xPos,
            yPos: params.offset[1] + init.yPos
        })
    }, {bounds : {
       ...bound
    }});

    return <button id={id}
        {...bindPos()}
        style={{ /*MODIFIED!*/
            ...style,
            position: "absolute",
            left: pos.xPos,
            top: pos.yPos,
            width: pos.xSize,
            height: pos.ySize
        }}
        onClick = {onClick}
    >
        {pos.name}
    </button>
}