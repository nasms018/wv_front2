import React, { useContext } from 'react'
import { AxiosAuth, Fetch } from 'toolbox/Fetch'
import { useLocation } from "react-router-dom";
import Reporter from './Reporter';
import ReportSuspectPost from './ReportSuspectPost';
import ReportSuspectUser from './ReportSuspectUser';
import AppContext from "context/AppContextProvider";

export default function ReportDetails() {
  const location = useLocation();
  let state = location.state.report;
  let report = location.state.report
  console.log(report)
  function renderWork(data) {

    return <><fieldset>
      <legend>신고 상세(포스트)</legend>
      <Reporter report={report} />
      <ReportSuspectPost report={report} data={data} />
    </fieldset></>
  }

  return (
    <>
      {report.suspectTable === "t_account" ?
        <AxiosAuth uri={`/party/findById/${report.suspectId}`} renderSuccess={(res) => {
          return <><fieldset>{console.log(res.data)}
            <legend>신고 상세(유저)</legend>
            <Reporter report={report} />
            <ReportSuspectUser report={report} suspectUser={res.data} />
          </fieldset></>
        }} />
        : <Fetch uri={`/work/anonymous/findById/${report.suspectId}`} renderSuccess={renderWork} />}
    </>
  )
}
