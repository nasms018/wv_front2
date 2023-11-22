import React, { useState, useEffect, useContext } from 'react';
import axios from 'api/axios';
import MemberRoleList from './MemberRoleList';
import { Table } from 'react-bootstrap';
import AppContext from "context/AppContextProvider";
import LoginTypeIcon from 'toolbox/LoginTypeIcon';

export default function MemberList({dataList, setLastIntersectingImage=f=>f, auth}) {

    const backgroundColorTD = {
        backgroundColor: "#00CDFF"
    }

    return <Table className='react-bootstrap-table' style={{ width: "100%" }}>
        <thead>
            <tr>
                <th style={backgroundColorTD}>아이디</th>
                <th style={backgroundColorTD}>닉</th>
                <th style={backgroundColorTD}>이름</th>
                <th style={backgroundColorTD}>생년월일</th>
                <th style={backgroundColorTD}>성별</th>
                <th style={backgroundColorTD} colSpan={1}>분류</th>
            </tr>
        </thead>
        <tbody>
            {dataList?.map((member, index) => {
                if (index === dataList.length - 1) {
                    return (
                        <>
                            <tr key={member.id} ref={setLastIntersectingImage}>
                                <td><b>{member.loginId ? member.loginId : "비공개"}</b></td>
                                <td><b>{<LoginTypeIcon loginType={member.accountType} />} {member.nick ? member.nick : member.kakaoNick}</b></td>
                                <td><b>{member.response?.name}</b></td>
                                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                                <td>{member.response?.sex === "남성" ? "남성" : member.response?.sex === "여성" ? "여성" : "비공개"}</td>
                                <td><MemberRoleList member={member} /></td>
                            </tr>
                            {member.response?.contactPointList?.map(cp => (
                                <tr key={member.id + cp.cpType}>
                                    <td></td>
                                    <td>{cp.cpType}</td>
                                    <td colSpan='4' align="left">{cp.cpVal}</td>
                                </tr>
                            ))}
                        </>
                    );
                } else {
                    return (
                        <>
                            <tr key={member.id}>
                                <td><b>{member.loginId ? member.loginId : "비공개"}</b></td>
                                <td><b>{<LoginTypeIcon loginType={member.accountType} />} {member.nick ? member.nick : member.kakaoNick}</b></td>
                                <td><b>{member.response?.name}</b></td>
                                <td>{member.response?.birthDate?.substr(0, 10)}</td>
                                <td>{member.response?.sex === "남성" ? "남성" : member.response?.sex === "여성" ? "여성" : "비공개"}</td>
                                <td><MemberRoleList member={member} /></td>
                            </tr>
                            {member.response?.contactPointList?.map(cp => (
                                <tr key={member.id + cp.cpType}>
                                    <td></td>
                                    <td>{cp.cpType}</td>
                                    <td colSpan='4' align="left">{cp.cpVal}</td>
                                </tr>
                            ))}
                        </>
                    );
                }
            })
            }
        </tbody>
    </Table>
}
