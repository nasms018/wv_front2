import React, { useState } from 'react'
import { displayDate } from 'toolbox/DateDisplayer'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ThumbnailList from 'atom/ThumbnailList'

export default function ReportSuspectPost({ report, data }) {
  const [isReport] = useState(true);

  return (
    <Table><thead>
      <td></td>
      <th>보드</th>
      <th>구분</th>
      <th>포스트ID</th>
      <th>제목</th>
      <th>작성일</th>
      <th>작성자</th>

    </thead>
      <tbody>
        <tr>
          <td rowSpan="3" width="10%">신고대상</td>
          <td>{data?.boardVO?.id}</td>
          <td>{data?.ksuspectType}</td>
          <td>{data?.id}</td>

          <td><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${data?.id}`} state={{ seriesId: data?.id, page: 1, isReport: isReport }}>{data?.title}</Link></td>
          <td>{displayDate(data?.regDt, data?.uptDt)}</td>
          <td>{data?.writer?.nick}</td>

        </tr>
        <tr>
          <td>내용</td>
          <td colSpan="5" width="70%">{data?.content?.substring(0, 30)}</td>

        </tr>
        <tr>
          <td>첨부</td>
          {console.log(report.listAttachFile)}
          <td colSpan="5" width="70%"><ThumbnailList imgDtoList={report.listAttachFile} /></td>

        </tr>
      </tbody>
    </Table>
  )
}