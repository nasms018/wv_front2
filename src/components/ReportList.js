import { useState, useEffect, useContext } from "react";
import axios from "api/axios";
import AppContext from "context/AppContextProvider";
import { Table } from "react-bootstrap";
import { displayDate } from "toolbox/DateDisplayer";
import LoginTypeIcon from "toolbox/LoginTypeIcon";
import { Link } from "react-router-dom";

export default function ReportList({dataList, setLastIntersectingImage=f=>f, auth}) {
    console.log(dataList)
    return <>
        <Table striped variant="light">
            <thead>
                <th>작성일</th>
                <th>신고자</th>
                <th>신고대상</th>
                <th>첨부</th>
            </thead>
            <tbody>
                {dataList.map((report, index) => {
                    return index === dataList.length - 1
                        ? <>
                            <tr ref={setLastIntersectingImage}>
                                <td>{displayDate(report.regDt, report.uptDt)}</td>
                                <td>
                                    <LoginTypeIcon loginType={report?.reporter?.accountType} />
                                    {!report.reporter?.nick ? report.reporter?.kakaoNick : report.reporter?.nick}
                                </td>
                                <td><Link to={`/ReportDetails/${report.id}`} style={{ all: "unset", cursor: "pointer" }} state={{ report }}>{report.suspectTable} - {report.suspectId}</Link></td>
                                <td>{(report?.listAttachFile && report.listAttachFile?.length > 0) ? "O" : "X"}</td>
                            </tr>
                            <tr>
                                <td colSpan={5}>{report.rptTypesList.map((type) => (
                                    <>{type.rptType}  </>))}</td>
                            </tr>
                        </>
                        : <>
                            <tr>
                                <td>{displayDate(report.regDt, report.uptDt)}</td>
                                <td>
                                    <LoginTypeIcon loginType={report?.reporter?.accountType} />
                                    {!report.reporter?.nick ? report.reporter?.kakaoNick : report.reporter?.nick}
                                </td>
                                <td><Link to={`/ReportDetails/${report.id}`} style={{ all: "unset", cursor: "pointer" }} state={{ report }}>{report.suspectTable} - {report.suspectId}</Link></td>
                                <td>{(report?.listAttachFile && report.listAttachFile?.length > 0) ? "O" : "X"}</td>
                            </tr>
                            <tr>
                                <td colSpan={5}>{report?.rptTypesList.map((type) => (
                                    <>{type.rptType}  </>))}</td>
                            </tr>
                        </>
                })}
            </tbody>
        </Table>

    </>
}