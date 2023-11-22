import React from 'react'
import { displayDate } from 'toolbox/DateDisplayer';
import { Table } from 'react-bootstrap'
export default function Reporter({ report }) {
  return (
    <Table><thead>
      <th></th>
      <th>구분</th>
      <th>신고인</th>
      <th>신고일</th>
      <th >신고이유</th>
    </thead>
      <tbody>
        <tr>
          <td rowSpan="2" width="10%">신고자</td>
          <td>{report.reporter.accountType}</td>
          {report?.reporter?.accountType === "원더" ?
            <td>{report.reporter.nick}</td> :
            <td>{report?.reporter?.accountType}</td>}
          <td>{displayDate(report?.regDt, report?.uptDt)}</td>
          <td width="50%">{report?.cause}</td>
        </tr>
        <tr>
          <td colSpan="4">
            {report?.rptTypesList?.map((rptType) => <>{rptType.rptType}&nbsp;&nbsp;&nbsp;</>)}
          </td>
        </tr>
      </tbody>
    </Table>

  )
}
