import { useContext } from 'react';
import ToolContext from './ToolContextProvider';
import GraphCanvas from "./GraphCanvas"
import PropAccordion from './PropAccordion';

export default function ToolDetail() {
    const {xToolSize, yToolSize} = useContext(ToolContext);

    return <table>
        <td style={{ width: xToolSize + 100, height: yToolSize + 500 }}>
            <GraphCanvas />
        </td>
        <td style={{ width: "100%" }}>
            <PropAccordion />
        </td>
    </table>
}
