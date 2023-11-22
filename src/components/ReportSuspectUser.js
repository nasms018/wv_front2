import React from 'react'
import { displayDate } from 'toolbox/DateDisplayer'
import { Table } from 'react-bootstrap'
import MemberStatusList from 'login/MemberStatusList'
import MemberRoleList from 'login/MemberRoleList'
import ThumbnailList from 'atom/ThumbnailList'

export default function ReportSuspectUser({ suspectUser, report }) {
  console.log(suspectUser)
  return (
    <Table><thead>
      <th></th>
      <th>닉</th>
      <th>분류</th>
      <th>아이디</th>
      <th>신고일</th>
      <th>첨부</th>
      <th></th>
    </thead>
      <tbody>
        <tr>
          <td rowSpan="3" width="10%">신고대상</td>
          <td>{suspectUser?.nick}</td>
          <td>{suspectUser?.accountType}</td>
          <td>{suspectUser?.loginId}</td>
          <td>{displayDate(report?.regDt, report?.uptDt)}</td>
          <td width="30%"><ThumbnailList imgDtoList={report.listAttachFile} /></td>
        </tr>
        <tr>
          <td></td>
          <td colSpan="5" width="70%"><MemberRoleList report={report} member={suspectUser} /></td>
        </tr>
        <tr>
          <td></td>
          <td colSpan={5}><MemberStatusList report={report} member={suspectUser} />{/**/}</td></tr>
      </tbody>
    </Table>
  )
}