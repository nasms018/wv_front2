import { useContext } from 'react';
import ToolContext from './ToolContextProvider';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';
import PureDrag from './PureDrag';

export default function PropAccordion() {
    const {nowObjectList, onUpdate} = useContext(ToolContext);

    return <div style={{ width: "100%" }}>
        <div style={{ display: 'block????', backgroundColor: nowObjectList && nowObjectList.length > 0 ? "blue" : "white", padding: 1 }}> 
        <Accordion alwaysOpen flush>
            {nowObjectList?.map((obj, index) => {
                return <Accordion.Item key={index} eventKey={index}>
                    {console.log(obj?.name)}
                    <Accordion.Header>{obj?.name + "(" + obj?.id + ")"}</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor:"lightblue"}}>
                        <PureDrag
                            propList={obj?.customPropertiesList.map(
                                prop => {
                                    return {...prop}
                                }
                            )}
                            onChange={(newList) => onUpdate(newList, index)}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            })}
        </Accordion>
        </div>
    </div>
}

export function isAnyDanger(propList) {
    return propList.reduce((current, inputProp) => {
        // 기존에 위험한 게 있었거나 이번 게 안전하지 않으면 위험한 게 있는 것이다
        return current || ! inputProp.isSafe
    }, false)
}