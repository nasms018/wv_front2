import { useLocation, useParams } from "react-router";
import { useContext, useState, useEffect, useMemo } from "react";
import AppContext from "context/AppContextProvider";
import ToolTable from "./ToolTable";
import axios from 'api/axios';

export default function ToolExplorer() {
    const { auth } = useContext(AppContext);

    const location = useLocation();
    const param = useParams();
    const state = location.state;

    console.log("지금 상태 보여 줘", state)

    const TOOLSKIN_MANAGE_URL = "/tool/manageToolSkin/"
    const TOOLSKIN_DELETE_URL = "/tool/deleteTool/"

    const [toolListUri, setToolListUri] = useState(buildUrl());

    const [nowData, setNowData] = useState()

    function buildUrl() {
        return "/tool/listAllNextTools/" + state?.seriesId + "/path" + state?.toolId + "/" + state?.page
    }

    function manageToolSkin(toolSkin, index) {
        console.log("이 유저가 보냅니다: ", auth)
        let uri = TOOLSKIN_MANAGE_URL + state?.seriesId
        console.log("다음 주소로 보냅니다: ", uri)
        console.log("이것을 보냅니다: ", toolSkin)
        axios.post(uri, toolSkin, {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        }).then(res => {
            let oldData = {...nowData }
            let newData = {...nowData }
            let newSkin = {...res.data, idEditing : false, isCreating : false}
            newData.firstVal[index] = newSkin
            setNowData(newData)
            console.log("데이터 비교좀 하자", oldData, nowData)
        }).catch((error) => { console.log(error) })
    }

    function deleteToolSkin(id) {
        console.log("이 유저가 보냅니다: ", auth)
        let uri = TOOLSKIN_DELETE_URL + id
        console.log("다음 주소로 보냅니다: ", uri)
        axios.delete(uri, {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        }).then(() => {
            let newData = {...nowData, firstVal : [...nowData.firstVal].filter(data => data.id !== id)}
            setNowData(newData)
        } 
        ).catch((error) => { console.log(error) })
    }
    
    useEffect(() => {
        console.log("여기는 언제 들어가? 1111111111111111111111")
        axios.get(buildUrl(), {
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": `Bearer ${auth?.accessToken}`
            }
        }).then(res => setNowData(readyForEditing(res?.data)))
    }, [])


    useMemo(() => {
        console.log("여기는 언제 들어가? 2222222222222222222222")
        axios.get(buildUrl(),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            }).then(res => setNowData(readyForEditing(res?.data)))
    }, [toolListUri, param])

    function readyForEditing(data) {
        return {
            ...data,
            firstVal: data?.firstVal?.map(tool => { return { ...tool, isEditing: false, isCreating: false } })
        }
    }


    console.log("로케이션 상태 보여줘!", state)
    console.log("파란색 보여줘!", param)
    console.log("보낸 주소 보여줘!", buildUrl()) // 너가 왜 안 바뀌냐고오

    return <div>
        <br />
        <ToolTable
            data={nowData}
            state={state}
            param={param}
            setToolListUri={setToolListUri}
            buildUrl={buildUrl}
            setData={setNowData}
            manageToolSkin={manageToolSkin}
            deleteToolSkin={deleteToolSkin}
        />
    </div>
}