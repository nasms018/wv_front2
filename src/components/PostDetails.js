import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { displayDate } from "toolbox/DateDisplayer";
import ReplyList from "./ReplyList";
import AppContext from "context/AppContextProvider";
import { Accordion } from "react-bootstrap";
import ThumbnailList from "atom/ThumbnailList";
import OriginalViewList from "atom/OriginalViewList";
import { ListGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import axios from "api/axios";
import PostPrevNext from "./PostPrevNext";
import LoginTypeIcon from "toolbox/LoginTypeIcon";
import { AxiosAuth, Fetch } from "toolbox/Fetch";
import { BiArrowToTop, BiArrowToBottom  } from "react-icons/bi";


export default function PostDetails() {
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);
  const location = useLocation();
  const state = location.state;
  const post = location.state?.post;
  console.log("지금 상태는 어때?", state);
  const [nowLike, setLike] = useState(post?.likeCount);
  const [nowDislike, setDisLike] = useState(post?.dislikeCount);
  const postUri = `/work/anonymous/findById/${post?.id}`;



  const onLike = async (id, like) => {
    let newLike = like++;
    console.log("예상치 : ", newLike)
    try {
      await axios.get(
        `/work/anonymous/onLike?id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((res) => {
          console.log("잘 다녀왔는지 보자", res)
        })

    } catch (err) {
      console.log(err);
    }
    //navigate(0);
    setLike(like++)
  }

  const onDisLike = async (id, dislike) => {
    let newDisLike = dislike++;
    console.log("예상치 : ", newDisLike)
    try {
      await axios.get(
        `/work/anonymous/onDisLike?id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((res) => {
          console.log("잘 다녀왔는지 보자", res)
        })
    } catch (err) {
      console.log(err);
    }

    setDisLike(dislike++)
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.delete(`/work/${post.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${auth.accessToken}`
          }
        });
    } catch (err) {
      console.log('Delete Failed', err);
    } finally {
      console.log('Delete state', state);
      navigate(-1, { state: state });
    }
  }

  const onTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0 });
  }
  const onBottom = (e) => {
    e.preventDefault();
    window.scrollTo(0, document.body.scrollHeight);
  }

  return <>
    <AxiosAuth uri={postUri} renderSuccess={({ data }) => <RenderSuccess post={data} />} />
  </>

  function RenderSuccess({ post }) {
    console.log("포스트 내용 좀 보자", post)
    console.log("스테이트 좀 보자", state)
    return <>
      <div style={{ position: "fixed", zIndex: "2", opacity: 0.6, overflow: "auto", right: "5%", top: "33%"}}>
          <Button variant="outline-danger" onClick={(e) => onTop(e)}><BiArrowToTop /></Button><br/><br/>
          <Button variant="outline-danger" onClick={(e) => onBottom(e)}><BiArrowToBottom /></Button>
      </div>

      <ListGroup as="ul" style={{ width: "60%", margin: "auto" }}>
        
        <ListGroup.Item variant="light" as="li" style={{ whiteSpace: "pre-line", textAlign: "left" }}>
          <div>{post?.content}</div></ListGroup.Item>
        <ListGroup.Item as="li">
          {(state?.boardId === "0000" || state?.boardId === "0001") ? <ThumbnailList imgDtoList={post?.listAttachFile} /> :
            <OriginalViewList imgDtoList={post?.listAttachFile} x="90%" y="90%" />}
        </ListGroup.Item>
        <ListGroup.Item>
          <LoginTypeIcon loginType={post?.writer?.accountType} />{!post.writer?.nick ? post.writer?.kakaoNick : post.writer?.nick}&nbsp;&nbsp;
          ✔<span>{post.readCount}</span>&nbsp;&nbsp;
          <span onClick={() => { onLike(post.id, post.likeCount) }}>👍{nowLike}</span>&nbsp;&nbsp;
          <span onClick={() => { onDisLike(post.id, post.dislikeCount) }}>😡{nowDislike}</span>
          🕐<span>{displayDate(post.regDt, post.uptDt)} </span><br /></ListGroup.Item>
        <ListGroup.Item> <PostPrevNext post={post} /></ListGroup.Item>
        <ListGroup.Item>
          {(state?.boardId === "0000" || state?.boardId === "0001") ?
            <Link key={state.parentId} to={`/board/${state.boardId}`} state={{ page: state.page, boardId: state.boardId, post: post, parentId: state?.parentId, seriesId: state.parentId }}><Button variant="outline-warning">목록</Button></Link>
            : <Link key={state.parentId} to={`/series/${state?.parentId}`} state={{ seriesId: state.parentId, page: state.page, boardId: state.boardId, post: post, parentId: state?.parentId }}><Button variant="outline-warning">목록</Button></Link>}
          &nbsp;

          {(post.writer ? post.writer.id === auth.userId : false) ? <>
            <Link
              to={`/series/${post.id}/mng`}
              state={{ seriesId: state.seriesId, post, state, parentId: state.parentId }}
            ><Button variant="outline-info">수정</Button></Link>&nbsp;<Button variant="outline-dark" onClick={handleDelete}>삭제</Button></> : ""}
          <br />
        </ListGroup.Item>
      </ListGroup>


      <Accordion style={{ width: "60%", margin: "auto" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>댓글확인</Accordion.Header>
          <Accordion.Body>
            <ReplyList parent={post} state={{ seriesId: state.seriesId, post, state, parentId: state.parentId, boardId: state.boardId }} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  }
}

// 아코디언 색 먹이기 <div style={{ display: 'block????', backgroundColor:"blue", padding: 1 }}>
// <Accordion.Body style={{ backgroundColor:"lightblue"}}>