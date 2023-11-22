import axios from 'api/axios';
import React, { useState, useContext } from 'react'
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import AppContext from 'context/AppContextProvider';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function MemberStatusList({ member }) {

  const [value, setValue] = useState(member?.loginResultCode.toString());
  const code = member?.loginResultCode;
  const { auth } = useContext(AppContext);
  const navigate = useNavigate();
  const setStatus = async (e, value, memberId) => {
    e.preventDefault();
    const bodyData = {
      accountId: memberId,
      loginResultCode: value,
    };
    console.log(JSON.stringify(bodyData));

    try {
      const response = await axios.get(
        `/party/updateStatus/${memberId}/${value}`,

        {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth?.accessToken}`
          }
        }
      );
      setValue(value);
      navigate(0)
    } catch (err) {
      console.log('Registration Failed');
    }
  }

  return (
    <div>
      <td>
        <RadioGroup value={value} onChange={setValue} >
          <Radio value="0" checked={code === "0"} disabled>강제탈퇴</Radio>
          <Radio value="1" checked={code === "1"}>정상계정</Radio>
          <Radio value="2" checked={code === "2"}>만료계정</Radio>
          <Radio value="3" checked={code === "3"}>계정정지</Radio>
        </RadioGroup>  </td>
      <td><Button onClick={(e) => setStatus(e, value, member.id)} variant="outline-warning">변경</Button></td>
    </div>
  )
}