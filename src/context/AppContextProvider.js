import { createContext, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    let user = window.sessionStorage.getItem("nowUser");
    console.log(user ? JSON.parse(user) : "야");
    const [auth, setAuth] = useState(user ? JSON.parse(user) : {nick : "", roles : []});
    const [cpCodeList, setCpCodeList] = useState();
    const [rptCodeList, setRptCodeList] = useState();
    const [genreCodeList, setGenreCodeList] = useState();
    const [relationRemocon, setRelationRemocon] = useState();
    const [explorerRemocon, setExplorerRemocon] = useState();
    
    return (
        <AppContext.Provider value={{
            auth, setAuth,
            cpCodeList, setCpCodeList,
            rptCodeList, setRptCodeList,
            genreCodeList, setGenreCodeList,
            relationRemocon, setRelationRemocon,
            explorerRemocon, setExplorerRemocon
        }}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext;