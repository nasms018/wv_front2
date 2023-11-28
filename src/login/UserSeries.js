import AppContext from "context/AppContextProvider";
import { useContext } from 'react';
import { useState, useEffect } from "react";
import axios from "api/axios";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { displayDate } from "toolbox/DateDisplayer";
import OriginalViewOne from "atom/OriginalViewOne";
import Button from "react-bootstrap/Button";

export default function UserSeries({dataList, setLastIntersectingImage=f=>f, auth}) {
    
    return (
        <div>
            {dataList?.length === 0 ? "" :
                <Table responsive variant="white">
                    <thead>
                        <th></th>
                        <th>위치</th>
                        <th>내작품보기</th>
                        <th>조회수</th>
                        <th>작성일</th>
                    </thead>
                    <tbody>
                        {dataList?.map((post, index) => {
                            if (index === dataList.length - 1) {
                                return (
                                    <tr key={post.id} ref={setLastIntersectingImage}>
                                        <td><OriginalViewOne imgDtoList={post?.listAttachFile} x="100" y="auto" /></td>
                                        <td>{post.boardVO.id}</td>
                                        <td width="60%"><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: post?.boardId }}>{post.title}<br />
                                            <Button variant="outline-primary" size="sm">작품확인</Button></Link>
                                            <Link style={{ textDecoration: "none", color: "black" }} ><Button variant="outline-warning" size="sm">통계보기</Button></Link>
                                        </td>
                                        <td>✔{post.readCount}</td>
                                        <td>🕐{displayDate(post.regDt, post.uptDt)}</td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <>
                                        <tr key={post.id}>
                                            <td><OriginalViewOne imgDtoList={post?.listAttachFile} x="100" y="auto" /></td>
                                            <td>{post.boardVO.id}</td>
                                            <td width="60%"><Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: post?.boardId }}>{post.title}<br />
                                                <Button variant="outline-primary" size="sm">작품확인</Button></Link>
                                                <Link style={{ textDecoration: "none", color: "black" }}
                                                    to={`/series/${post.id}/statistics`}
                                                >
                                                    <Button variant="outline-warning" size="sm">통계보기</Button>
                                                </Link>
                                            </td>
                                            <td>✔{post.readCount}</td>
                                            <td>🕐{displayDate(post.regDt, post.uptDt)}</td>
                                        </tr>
                                    </>

                                );
                            }
                        })
                        }

                    </tbody>
                    <tfoot>
                    </tfoot>
                </Table>
            }
        </div>
    )
}
