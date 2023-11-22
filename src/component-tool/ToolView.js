import ToolDetail from 'component-tool/ToolDetail';
import { useState, useRef, useEffect, useContext } from 'react';
import { AxiosAuth } from 'toolbox/Fetch';
import { useLocation, useParams } from "react-router";
import AppContext from "context/AppContextProvider";
import { ToolContextProvider } from './ToolContextProvider';
import ToolData from './ToolData';

export default function ToolView() {

    const param = useParams();

    console.log("파란색 보여 줘!", param)

    const TOOL_DETAILS_URL = "/tool/getToolById/";


    return <AxiosAuth uri={TOOL_DETAILS_URL + param.idPath}
        renderSuccess={(res) =>
            <ToolContextProvider>
                <ToolData data={res?.data} />
            </ToolContextProvider>
        }
    />

}