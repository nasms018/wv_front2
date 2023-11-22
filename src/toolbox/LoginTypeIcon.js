import { FaWpexplorer, FaComment } from "react-icons/fa"

export default function LoginTypeIcon({loginType = ""}) {
    switch (loginType) {
        case "원더" : {return <FaWpexplorer/>;}
        case "카카오" : {return <FaComment/>;}
        default : {return null}
    }
}