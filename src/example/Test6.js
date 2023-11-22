import ReduxClassroom from "./ReduxClassroom"
import {Store} from "redux"

export default function Test6() {
    const complexData = {
        teacher : {
            name: "Aifrrin",
            propList: [
                {
                    propType: "종족",
                    propVal: "키똑"
                },
                {
                    propType: "나이",
                    ropVal: "734살"
                }
            ]
        },
        studentsList: [
            {
                name: "Reiwar",
                propList: [
                    {
                        propType: "종족",
                        propVal: "키똑"
                    },
                    {
                        propType: "나이",
                        ropVal: "208살"
                    }
                ]
            },
            {
                name: "Yeiny",
                propList: [
                    {
                        propType: "종족",
                        propVal: "네이슬리안"
                    },
                    {
                        propType: "나이",
                        propVal: "216살"
                    }
                ]
            },
            {
                name: "Dhileno",
                propList: [
                    {
                        propType: "종족",
                        propVal: "베힐루프"
                    },
                    {
                        propType: "나이",
                        propVal: "232살"
                    }
                ]
            }
        ]
    }

    const rename = (text, pos) => ({
        type: 'rename',
        text,
        pos
    })

    const retype = (text, pos) => ({
        type: 'retype',
        text,
        pos
    })

    const revalue = (text, pos) => ({
        type: 'retype',
        text,
        pos
    })

    const arrange = (newArray) => ({
        type: 'retype',
        newArray
    })
    
    // state가 undefined이면 initialState를 기본값으로 사용
    function reducer(state = complexData, action) {
        // action type에 따라 작업 처리
        switch(action.type) {
            case "EDIT_NAME":
                return {
                    // 불변성 유지
                    ...state,
                    
                }
            case "EDIT_PROPTYPE":
                return {
                    ...state,
                    counter: state.counter + 1
                }
            case "EDIT_PROPVAL":
                return {
                    ...state,
                    counter: state.counter - 1
                }
            case "ARRANGE":
                return {
                    ...state,
                    counter: state.counter - 1
                }
            default:
                return state;
        }
    }


    return <ReduxClassroom teacher={complexData.teacher} studentsList={complexData.studentsList}/>
}
