import { useState, useEffect } from "react"
import { Fetch } from "toolbox/Fetch"
import PropList from "./CustomProperty"

export default function PropArea({selected, selectedName}) {

    const PROPERTIES_LIST_URL = `/tool/anonymous/listPropertiesOf/`

    console.log("잘먹겠습니다", selected)

    const [name, setName] = useState(selectedName);

    return <>
        {selected && selected.id
        ? <div style={{margin : "10px"}}>
             <input style={{verticalAlign : "top", width : "384px"}}
                type="text"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
			    required
            />
            <br/><br/>
            <div>
                <Fetch uri={PROPERTIES_LIST_URL + selected.id}
                    loadingFallBack={<p>loading...</p>}
                    renderSuccess={data => {
                        console.log("이것도 데이터 나온 거라고......", data)
                        return <PropList data={data}/>
                    }}
                    doLog={true}
                />
            </div>
        </div>
        : <p> {"(선택된 객체가 없습니다.)"} </p>
        }
        
    </>
}