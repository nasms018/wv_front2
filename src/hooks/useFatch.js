import { useState, useEffect } from 'react';
import axios from 'api/axios';

//Hook 사용은 함수 처리 안에서는 사용 불가능 하군요.
function useFatch(uri, doLog) {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    //console.log(uri)
    useEffect(() => {
        if (!uri) {
            return;
        }
        fetch(uri).then(response => response.json())
            .then((resData) => {
                setData(resData);
                if (doLog) {
                    //console.log("response에서 읽은 data는 이러합니다:", resData)
                }
            })
            .then(setLoading(false))
            //.then(console.log("난 언제 나오지?"))
            .catch(setError);
    }, [uri]);
    return { loading, data, error };
}

function usePost(uri, body) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uri || !body) return;

        axios.post(uri, body,
            {
                headers: { "Content-Type": "application/json" },
                responseType: "blob"
            })
            .then(setData)
            .then(setLoading(false))
            .catch(setError);
    }, [uri, body]);
    return { loading, data, error };
}

function useAuth(uri, auth) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //console.log("여기를 통과했음", uri, auth)
        if (!uri || !auth) return;
        axios.get(uri,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `Bearer ${auth?.accessToken}`
                }
            })
            .then(setData)
            .then(setLoading(false))
            .catch(setError);
    }, [uri, auth]);
    return { loading, data, error };
}

export { useFatch, usePost, useAuth };