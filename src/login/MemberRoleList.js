import axios from 'api/axios';
import React, { useState, useContext } from 'react'
import RadioGroup from 'toolbox/RadioGroup';
import Radio from 'toolbox/Radio';
import AppContext from 'context/AppContextProvider';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function MemberRoleList({ member }) {
  const [value, setValue] = useState(member?.roleList[0]?.role);
  const { auth } = useContext(AppContext);
  const navigate = useNavigate();

  const reRole = async (e, value, memberId) => {
    e.preventDefault();

    const bodyData = {
      accountId: memberId,
      role: value,
    };
    console.log(JSON.stringify(bodyData));

    try {
      const response = await axios.get(
        `/party/reRole/${memberId}/${value}`,
        
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
    <div><td>
      {member?.roleList?.map((role) => (

        <RadioGroup value={value} onChange={setValue} >
                  {console.log(role)}
          <Radio value="reader" checked={role === "reader"}>Reader</Radio>
          <Radio value="writer" checked={role === "writer"}>Writer</Radio>
          <Radio value="manager" checked={role === "manager"}>Manager</Radio>
          <Radio value="admin" checked={role === "admin"} disabled>Admin</Radio>
        </RadioGroup>    ))}</td>
        <td><Button onClick={(e)=>reRole(e,value, member.id)} variant="outline-success">변경</Button></td>
    </div>
  )
}