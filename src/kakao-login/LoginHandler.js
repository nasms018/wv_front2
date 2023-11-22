import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import AppContext from 'context/AppContextProvider';
import axios from "axios";

import Loading from 'toolbox/Loading';
const LoginHandler = (props) => {
  const { setAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  console.log("코드를 보자......!", code)

  //인가코드 백으로 보내는 코드
  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
      }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        let data = res?.data
        console.log("카카오톡이 뭘 줬을까?", data);
        //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        const accessToken = data.token;
        const userId = data.userId;
        const roles = data.roles;
        const nick = data.userNick;
        const loginId = data.userLoginId;
        const accountType = data.accountType;
        const loginCode = data?.loginResultCode;
        setAuth({ roles, nick, accessToken, loginId, userId, accountType, code });
        window.sessionStorage.setItem("nowUser", JSON.stringify({ nick, roles, accessToken, loginId, userId, accountType, loginCode }))
        //로그인이 성공하면 이동할 페이지
        navigate("/");
      });
    };
    kakaoLogin();
  }, [props.history]);

  return (
    <div className="LoginHandeler">
      <div className="notice">
        <Loading />
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoginHandler;