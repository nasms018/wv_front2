import { useLocation } from "react-router";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { displayDate } from "toolbox/DateDisplayer";
import { Fetch } from "toolbox/Fetch";
import AppContext from "context/AppContextProvider";
import { Table } from "react-bootstrap";
import ThumbnailList from "atom/ThumbnailList";
import { Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LoginTypeIcon from "toolbox/LoginTypeIcon";
import Form from 'react-bootstrap/Form';
import { displayPagination } from "toolbox/Pagination";
export default function PostNormal() {
  const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  function buildUrl(step) {
    if (state?.search)
      return `/work/anonymous/search/${state?.boardId}/${state?.search}/${state.page}`;
    else
      return `/work/anonymous/listAllPost/${state.boardId}/${state.page}`;//${state.boardId}
  }
  const [postListUri, setPostListUri] = useState(buildUrl(222));
  const [targetBoard, setTargetBoard] = useState(state.boardId);

  if (targetBoard !== state.boardId) {

    setTargetBoard(state.boardId);
    setPostListUri(buildUrl());

  }

  const txtSearch = useRef();

  const onSearch = (e) => {
    e.preventDefault();
    let search = txtSearch.current.value;
    state.postListWithPaging = null;
    state.search = search;
    state.page = 1;

    setPostListUri(buildUrl());
  }

  function renderSuccess(postListWithPaging) {
    const postList = postListWithPaging?.firstVal;
    const pagenation = postListWithPaging?.secondVal;

    return <>

      <Table striped bordered hover responsive variant="white">
        <thead>
          <th><p></p></th>
          <th><p>게시글</p></th>
          <th><p>게시자</p></th>
          <th><p>조회수</p></th>
          <th><p>좋아요</p></th>
          <th><p>작성일</p></th>
        </thead>
        <tbody>
          {postList?.map(post => (
            <tr key={post.id}>

              <td><ThumbnailList imgDtoList={post?.listAttachFile} /></td>
              <td width="60%">
                <Link style={{ all: "unset", cursor: "pointer" }} key={post.id} to={`/post/${post.id}`}
                  state={{ page: state.page, search: txtSearch.current?.value, seriesId: state?.seriesId, parentId: state?.seriesId, post: post }}>{/*시리즈아이디필요*/}
                  {post.title}</Link>
              </td>
              <td><LoginTypeIcon loginType={post?.writer?.accountType} />{!post.writer?.nick ? post.writer?.kakaoNick : post.writer?.nick}</td>
              <td>{post.readCount}</td>
              <td>{post.likeCount}</td>
              <td>{displayDate(post.regDt, post.uptDt)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        </tfoot>
      </Table>
      <div style={{ Align: "center", display: "inline-block" }}>
        <Pagination>
          {pagenation?.lastPage >= 2 ? displayPagination(pagenation, state, setPostListUri, buildUrl) : ""}
        </Pagination>
      </div>
    </>
  }
  return (
    <div>
      <table style={{ margin: "auto", position: "static" }}><td>
        {!auth.roles || auth.roles.length === 0 ? "" :
          <Link style={{ marginLeft: "auto", position: "relative" }} to={`/series/${state.boardId}/mng`} state={{ seriesId: state.boardId, parentId: state.boardId, boardId: state.boardId, post: { boardVO: { id: state.boardId }, listAttachFile: [] } }}>
            <Button variant="outline-primary">신규</Button>
          </Link>}
      </td><td>
          <Form.Control placeholder="검색어" ref={txtSearch}></Form.Control>
        </td><td>
          <Button variant="outline-danger" onClick={onSearch}>
            검색
          </Button>
        </td>
      </table>
      <Fetch uri={postListUri} renderSuccess={renderSuccess} />
    </div>
  )
}