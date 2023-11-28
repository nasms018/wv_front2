import AppContext from "context/AppContextProvider";
import axios from "api/axios";
import { Form, InputGroup } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import DaumPost from "daumpost/DaumPost";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function UserProfile() {
  const { auth, setAuth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  const response = location.state?.response;
  const [nick, setNick] = useState(state?.nick);
  const [name, setName] = useState(response?.name);
  const [signInResult, setSignInResult] = useState({});
  const [introduction, setIntroduction] = useState(state?.introduction);
  const [birthDate, setBirthDate] = useState(response?.birthDate.substring(0, 10));
  const [sex, setSex] = useState(response?.sex);
  const { cpCodeList } = useContext(AppContext);
  const [nameBlur, isNameBlur] = useState(false);
  const [loginId, setLoginId] = useState(state?.loginId);
  const [idChecked, setIdChecked] = useState(false);
  const [uniqueId, setUniqueId] = useState(false);
  const [nickChecked, setNickChecked] = useState(false);
  const [uniqueNick, setUniqueNick] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [birthDateBlur, isBirthDateBlur] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState();
  const [listCP, setListCP] = useState(new Map(response?.contactPointList?.map(cp => [cp.cpType, cp.cpVal])));
  const [address, setAddress] = useState(state?.contactPointList?.filter(cp => cp.cpType === "home address")[0]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValidMatch(passWord ? passWord === matchPwd : false);
  }, [passWord, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [name, passWord, matchPwd]);

  const onBlur = (e) => {
    e.preventDefault();
    isNameBlur(true);
    console.log(birthDate);
    if (!birthDate && birthDate === "") {
      isBirthDateBlur(false);
    } else {
      isBirthDateBlur(true);
    }
  };

  const checkSex = (e) => {
    setSex(e.target.value)
  }
  const onBlurVal = async (e, type) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `/party/anonymous/checkUniqueVal/${type}/${e.target.value}`
      );
      if (type === "login_id") {
        console.log(response?.data);
        setIdChecked(true);
        setUniqueId(response?.data);
      }
      if (type === "nick") {
        if (!e.target.value && e.target.value === "") {
          setNickChecked(false);
          setUniqueNick(false);
        } else if (e.target.value === auth.nick) {
          setNickChecked(true);
          setUniqueNick(true);
        }
        else {
          console.log(response?.data);
          setNickChecked(true);
          setUniqueNick(response?.data);
        }
      }

    } catch (err) {
      setErrMsg("에러");
    }
  };

  const checkCPValidity = (e, code, inValue) => {
    console.log(code);
    console.log(inValue);
    e.preventDefault();
    if (code.validationRe && !new RegExp(code.validationRe).test(inValue)) {
      return;
    }

    listCP.set(
      code.codeVal,
      code.codeVal === "home address" ? address + " " + inValue : inValue
    );

    setListCP(listCP);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validMatch) return;

    let list = [];
    for (let [key, value] of listCP) {
      list.push({ cpType: key, cpVal: value });
    }

    const bodyData = {
      organization: { id: "0000" },
      accountId: state.id,
      partyId: response.id,
      name: name,
      nick: nick,
      loginId: loginId,
      passWord: passWord,
      sex: sex,
      birthDate: birthDate,
      introduction: introduction,
      listContactPoint: list,
    };
    console.log(JSON.stringify(bodyData));

    try {
      const response = await axios.post(
        "/party/updateMember",
        JSON.stringify(bodyData),
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `Bearer ${auth.accessToken}`
          },
        }
      );
      console.log(response?.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setAuth({ ...auth, nick });
      window.sessionStorage.setItem("nowUser", JSON.stringify({ ...auth, nick }));

      navigate(`/`);
      //clear state and controlled inputs
      //need value attrib on inputs for this
    } catch (err) {
      setErrMsg("Registration Failed");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get(`/party/deleteMember/${auth.nick}`,
        {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth.accessToken}`
          }
        });

    } catch (err) {
      console.log('Delete Failed', err);
    } finally {
      // navigate state 전달
      console.log('Delete state', state);
      setAuth({ nick: "", roles: [] });
      window.sessionStorage.setItem("nowUser", JSON.stringify({ nick: "", roles: [] }));
      setSignInResult({});
      navigate(-1, { state: state });
    }
  }
  console.log("지금 우리가 뭘 던지려고 하는 거야?", listCP);
  return (<Form controlId={loginId} style={{width:"60%", margin: "auto" }}>
        <fieldset>
        <legend>프로필</legend>

    <FloatingLabel
      controlId="floatingInput"
      label="이름"
      className="mb-3"
    ><Form.Control
        type="text"
        controlId="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        onBlur={onBlur}
      /></FloatingLabel>
    <FloatingLabel
      controlId="floatingInput"
      label="닉네임"
      className="mb-3"
    ><Form.Control
        type="text"
        controlId={nick}
        placeholder="닉네임을 정해주세요"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        onBlur={(e) => onBlurVal(e, "nick")}
        required
      /></FloatingLabel>
    <p>{nickChecked
      ? uniqueNick
        ? "사용 가능한 닉네임입니다"
        : "이미 사용중인 닉네임입니다"
      : ""}
    </p>
    <FloatingLabel
      controlId="floatingInput"
      label="아이디"
      className="mb-3"
    ><Form.Control
        type="text"
        id={loginId}
        value={loginId}
        disabled
      /></FloatingLabel>
    <FloatingLabel
      controlId="floatingInput"
      label="패스워드"
      className="mb-3"
    ><Form.Control
        input
        type="password"
        id="passWord"
        onChange={(e) => setPassWord(e.target.value)}
        value={passWord}
        required
      />{" "}
    </FloatingLabel>
    <FloatingLabel
      controlId="floatingInput"
      label="암호확인"
      className="mb-3"
    ><Form.Control
        type="password"
        id="userMatchPwd"

        placeholder="패스워드를 다시입력하세요"
        onChange={(e) => setMatchPwd(e.target.value)}
        value={matchPwd}
        required
      /></FloatingLabel>
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon2">생년월일</InputGroup.Text>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        onChange={(e) => setBirthDate(e.target.value)}
        min="1920-01-01"
        max="2023-12-31"
        aria-required="true"
        value={birthDate}
      />
      <InputGroup.Text id="basic-addon2">성별</InputGroup.Text>
      <InputGroup.Text id="basic-addon2">
        남
        {response?.sex === "남성" ?
          <input
            inline
            defaultChecked
            label="남성"
            name="userSex"
            type="radio"
            onChange={checkSex}
            value="남성"
            id={`inline-radio-1`}
          /> : <input
            inline
            label="남성"
            name="userSex"
            type="radio"
            onChange={checkSex}
            value="남성"
            id={`inline-radio-1`}
          />}
      </InputGroup.Text>
      <InputGroup.Text id="basic-addon2">
        여
        {response?.sex === "여성" ?
          <input
            inline
            defaultChecked
            label="여성"
            name="userSex"
            type="radio"
            onChange={checkSex}
            value="여성"
            id={`inline-radio-1`}
          /> : <input
            inline
            label="여성"
            name="userSex"
            type="radio"
            onChange={checkSex}
            value="여성"
            id={`inline-radio-1`}
          />}
      </InputGroup.Text>
    </InputGroup>
    {console.log(cpCodeList)}
    {cpCodeList?.map((code) => {
      let rcpVal = Array(...listCP.keys()).includes(code.codeVal) ? listCP.get(code.codeVal) : ""
      return <>{console.log(Array(...listCP.keys()))}{console.log(code)}{console.log(rcpVal)}
        <FloatingLabel
          controlId="floatingInput"
          label={code.codeVal}
          className="mb-3">
          {code.codeVal === "home address" ? (
            <>
              <DaumPost setAddress={setAddress} />
              <div style={{ width: "100%" }}>
                <Form.Control
                  type="text"
                  defaultValue={rcpVal}
                  value={address}
                  disabled
                />
                <Form.Control
                  type="text"
                  id={code.codeType}
                  onChange={(e) =>
                    checkCPValidity(e, code, e.target.value)
                  }
                  placeholder="상세주소입력"
                />
              </div>
            </>
          ) : (
            <Form.Control
              type="text"
              id={code.codeVal}
              defaultValue={rcpVal}
              onChange={(e) =>
                checkCPValidity(e, code, e.target.value)} />
          )}
        </FloatingLabel>
      </>
    })}
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon2">자기소개</InputGroup.Text>
      <Form.Control
        id="intro"
        as="textarea"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
      />{" "}
    </InputGroup>

    <Button variant="outline-primary"
      onClick={handleSubmit}
      disabled={
        !(
          validMatch &&
          nickChecked &&
          uniqueNick &&
          isNameBlur &&
          isBirthDateBlur
        )} >
      반영
    </Button>
    <Button variant="outline-dark" onClick={handleDelete}>
      탈퇴
    </Button>
    </fieldset>
  </Form >)
};
