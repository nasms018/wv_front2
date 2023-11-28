import { Fetch } from "toolbox/Fetch";
import Carousel from 'react-bootstrap/Carousel';
import OriginalViewOne from "atom/OriginalViewOne";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Home() {
  const seriesUri = `/work/anonymous/listAllSeries/0002/1?genreId=`;
  const seriesUri2 = `/work/anonymous/listAllSeries/0003/1?genreId=`;
  const postUri = `/work/anonymous/listAllPost/0000/1`;
  const txtSearch = useRef();
  const xSize = 550;
  const ySize = 700
  const announcement = "0000";
  const renderSuccess = (data) => {

    return (
      <Carousel fade>{/* */}
        {data?.firstVal?.map((post) => {
          return (
            <Carousel.Item interval={3000}>
              <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: "0002" }}>
                {post.listAttachFile?.length === 0 ?
                  <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width={xSize} height={ySize} />
                  : <OriginalViewOne key={post.id} imgDtoList={post.listAttachFile} x={xSize} y={ySize} />}
              </Link>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }

  const renderSuccess2 = (data) => {
    return (
      <Carousel>{/* */}
        {data?.firstVal?.map((post) => {
          return (
            <Carousel.Item interval={1500} >
              <Link style={{ textDecoration: "none", color: "black", overflow: "hidden" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: "0002" }}>
                {post.listAttachFile?.length === 0 ?
                  <div class="clipmain">
                    <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width={xSize} height={ySize} class="clipmain" /></div>
                  : <OriginalViewOne key={post.id} imgDtoList={post.listAttachFile} x={xSize} y={ySize} d="clipmain" />}
              </Link>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }

  const renderSuccessPost = (postListWithPaging) => {
    const postList = postListWithPaging?.firstVal;
    let postList2 = postList?.filter((post, i) => i < 7);

    return (<>
      <Table striped bordered hover variant="white" width={xSize} height={ySize / 2 - 100} border="2px">
        <th style={{backgroundColor: "#aa7755"}}><Link style={{ textDecoration: "none", color: "black" }} to={`/board/${announcement}`}
          state={{ boardId: `${announcement}`, page: 1 }}>공지사항</Link></th>
        {postList2?.map((post, i) =>
          <tr >
            <td>
              <Link style={{ all: "unset", cursor: "pointer" }} key={post.id} to={`/post/${post.id}`}
                state={{ id: post.id, page: 1, search: txtSearch.current?.value, postListWithPaging, seriesId: `${announcement}`, parentId: `${announcement}`, boardId: post?.boardVO?.id, post:post }}>{/*시리즈아이디필요*/}
                {post.title}</Link>
            </td>
          </tr>
        )}
      </Table>
    </>
    )
  }

  return (<>
  <br/><br/>
    <table style={{margin:"auto"}}>
      <tr>

        <td rowSpan='2' width={xSize} height={ySize} >
          <Fetch uri={seriesUri} renderSuccess={renderSuccess} />
        </td>

        <td width="10%"></td>
        <td width={xSize} height={ySize / 2 -100} >
          <Fetch uri={postUri} renderSuccess={renderSuccessPost} />
          <tr width={xSize} height={ySize / 2-100} ><Fetch uri={seriesUri2} renderSuccess={renderSuccess2} /></tr>
        </td>
      </tr>
    </table >
 </>
  )
}
