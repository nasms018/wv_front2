import { useState } from "react";
import CustomProperty from "./CustomProperty"

export default function PropList({data}) {
    const [propArray, setPropArray] = useState(data);

    function addProperty() {
        setPropArray([...propArray, {propType : "", propVal : ""}])
    }

    console.log("지금 데이타 실화냐?", propArray)

    return <>
        {propArray.map(property => {
            console.log("뉘신지?", property)
            return <div>
                <CustomProperty propType={property.propType} propVal={property.propVal}/>
            </div>})
        }
        <button style={{width : "100%"}} onClick={() => addProperty()}>+ 프로퍼티 추가</button>
    </>
}