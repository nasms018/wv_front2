import { Chart } from "react-google-charts";
import { useContext } from "react";
import AppContext from 'context/AppContextProvider';

export default function Test7() {

    const { genreCodeList } = useContext(AppContext);

    const SAMPLE_WORK_DATA = {
        "name" : "작품의 최근 30일동안의 조회수 추이",
        "readCountList" : [
            {"time" : "2023-11-11", "readCnt" : 6},
            {"time" : "2023-11-12", "readCnt" : 10},
            {"time" : "2023-11-13", "readCnt" : 7},
            {"time" : "2023-11-14", "readCnt" : 3},
            {"time" : "2023-11-15", "readCnt" : 5},
            {"time" : "2023-11-16", "readCnt" : 0},
            {"time" : "2023-11-17", "readCnt" : 1},
            {"time" : "2023-11-18", "readCnt" : 6},
            {"time" : "2023-11-19", "readCnt" : 10},
            {"time" : "2023-11-20", "readCnt" : 7},
            {"time" : "2023-11-21", "readCnt" : 6},
            {"time" : "2023-11-22", "readCnt" : 10},
            {"time" : "2023-11-23", "readCnt" : 9},
            {"time" : "2023-11-24", "readCnt" : 6},
            {"time" : "2023-11-25", "readCnt" : 3},
            {"time" : "2023-11-26", "readCnt" : 12},
            {"time" : "2023-11-27", "readCnt" : 8},
            {"time" : "2023-11-28", "readCnt" : 8},
            {"time" : "2023-11-29", "readCnt" : 11},
            {"time" : "2023-11-30", "readCnt" : 8},
            {"time" : "2023-12-01", "readCnt" : 9},
            {"time" : "2023-12-02", "readCnt" : 4},
            {"time" : "2023-12-03", "readCnt" : 3},
            {"time" : "2023-12-04", "readCnt" : 3},
            {"time" : "2023-12-05", "readCnt" : 8},
            {"time" : "2023-12-06", "readCnt" : 4},
            {"time" : "2023-12-07", "readCnt" : 9},
            {"time" : "2023-12-08", "readCnt" : 12},
            {"time" : "2023-12-09", "readCnt" : 13},
            {"time" : "2023-12-10", "readCnt" : 7},
        ]
    }

    let workDataForChart = [
        ["날짜", "조회수"],
        ...SAMPLE_WORK_DATA["readCountList"].map(
            readCnt => {
                return [new Date(...(readCnt["time"].split("-"))), readCnt["readCnt"]]
            }
        )
    ]

    const SAMPLE_USER_DATA = {
        "name" : "",
        "data" : genreCodeList?.map((genre, index) => {
            return {
                "genre" : genre?.genre,
                "readCnt" : Math.max(Math.min(index * index, 20 + index - (index - 10) * index), 0)
            }
        })
    }

    return <>
        <Chart width={1024} height={768}
            chartType="LineChart"
            data={workDataForChart}
            options={{
                title : SAMPLE_WORK_DATA["name"],
                pointSize : 5,
                trendlines: {
                    0: {
                        pointSize : 0
                    }
                },
            }}
        />
        <br/>
        <p>(대충 구글 차트 도넛 그래프)</p>
    </>
}