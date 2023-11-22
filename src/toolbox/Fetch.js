import AppContext from "context/AppContextProvider";
import {useFatch, usePost, useAuth} from "hooks/useFatch.js"
import { useContext } from "react";
import Loading from 'toolbox/Loading';

function Fetch({uri, renderSuccess = f => f,
    loadingFallBack = <Loading />,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>),
    doLog = false}) {

    const {loading, data, error} = useFatch(uri, doLog);

    if (doLog) {
        //console.log("어디 한 번 해보자");
        //console.log(uri, loading, data);
    }

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        //console.log("로딩 끝났다~!");
        return renderSuccess(data);
    }
}

function AxiosPost({uri, body, renderSuccess = f=>f,
    loadingFallBack = <Loading />,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>)}) {

    const {loading, data, error} = usePost(uri, body);

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        return renderSuccess(body, data);
    }
}

function AxiosAuth({uri, renderSuccess = f=>f,
    loadingFallBack = <Loading />,
    renderError = ({error})=>(<pre>{JSON.stringify(error, null, 2)}</pre>)}) {

    const {auth} = useContext(AppContext)

    const {loading, data, error} = useAuth(uri, auth);

    if (loading) return loadingFallBack;
    if (error) return renderError({error});
    if (data) {
        return renderSuccess(data);
    }
}

export {Fetch, AxiosPost, AxiosAuth};