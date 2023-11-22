import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from "react-bootstrap";
import { useEffect, useMemo, useContext } from "react";
import OriginalViewOne from "atom/OriginalViewOne";
import axios from "api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from 'react-bootstrap/Image';
import AppContext from "context/AppContextProvider";
import { Form } from "react-bootstrap";
import Favorites from './Favorites';
import { AxiosAuth } from 'toolbox/Fetch'

export default function ShowcaseList({ page, setPage = f => f, postList, setPostList = f => f, lastIntersectingImage, setLastIntersectingImage = f => f,
  listAttachFile, setByKeyWord = f => f, isSeries, txtSearch, onSearch = f => f, GenreCanvas = f => f }) {
  const param = useParams();
  console.log("PostListObserver param", param);

  useEffect((e) => {

    window.scrollTo({ top: 0 });
    setPage(1)

  }, [param.boardId])


  const { auth } = useContext(AppContext);

  useEffect(() => {
    const search = txtSearch.current.value
    if (search.trim()) {
      console.log("search")
      getPostListThenSet(`/work/anonymous/search/${param?.boardId}/${search}`)

      setByKeyWord(true)
    } else {
      console.log("여기 들어오냐? 여긴 써치 아님")
      getPostListThenSet(`/work/anonymous/listAllSeries/${param?.boardId}`);
      setByKeyWord(false)
    }
  }, [page])



  const getPostListThenSet = async (seriesListUri, isReset) => {
    try {
      const { data } = await axios.get(seriesListUri + `/${page}?genreId=${param?.genreId ? param?.genreId : ""}`);
      console.log("읽어온 게시글 목록", data?.firstVal);
      setPostList(isReset ? data?.firstVal : postList?.concat(data?.firstVal));
    } catch {
      console.error('fetching error');
    }
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);

      }
    });
  };

  useMemo(() => {
    async function recall() {
      try {
        const { data } = await axios.get(`/work/anonymous/listAllSeries/${param?.boardId}/1?genreId=${param?.genreId ? param?.genreId : ""}`);
        console.log("다시 불러온 게시글 목록", data?.firstVal);
        setPostList(data?.firstVal);

      } catch {
        console.error('fetching error');
      }
    }
    recall()
  }, [param]);

  useEffect(() => {
    let observer;
    if (lastIntersectingImage) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(lastIntersectingImage);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingImage]);


  return <>

    <table style={{ margin: "auto", position: "static" }} ><td>
    </td><GenreCanvas param={param} /><td>
        {!auth.roles || auth.roles.length === 0 ? "" :
          <Link to={`/series/mng`} state={{ seriesId: "", parentId: "", boardId: param?.boardId, post: { listAttachFile: listAttachFile, genreList: [] }, isSeries: isSeries }}>
            <Button variant="outline-primary">신규</Button>
          </Link>}
      </td><td>
        <Form.Control type="text" placeholder="검색어" ref={txtSearch} ></Form.Control>
      </td><td>
        <Button variant="outline-danger" onClick={onSearch}>
          검색
        </Button>
      </td>
    </table>
    <Container>
      <Row>
        {postList?.map((post, index) => {
          if (index === postList?.length - 1) {
            return (

              <Col id={post?.id} ref={setLastIntersectingImage}>
                <Card id={post?.id} style={{ width: '15rem' }} ><br />
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, page: 1, boardId: param?.boardId }}>
                    {post.listAttachFile?.length === 0 ?
                      <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" rounded />
                      : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                  </Link>
                  <Card.Body>
                    <Card.Title>{post?.title}
                      {!auth.roles || auth.roles.length === 0 ? "" :
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} renderSuccess={(res) => {
                          return <><Favorites favorites={res?.data} post={post} /></>
                        }} />}
                    </Card.Title>
                  </Card.Body>
                </Card><br />
              </Col>

            );
          } else {
            return (

              <Col id={post?.id}>
                <Card id={post?.id} style={{ width: '15rem' }} ><br />
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, page: 1, boardId: param?.boardId }}>
                    {post.listAttachFile?.length === 0 ?
                      <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" rounded />
                      : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                  </Link>
                  <Card.Body>
                    <Card.Title>{post?.title}
                      {!auth.roles || auth.roles.length === 0 ? "" :
                        <AxiosAuth uri={`/work/isFavorites/${post.id}`} renderSuccess={(res) => {
                          return <><Favorites favorites={res?.data} post={post} /></>
                        }} />}
                    </Card.Title>
                  </Card.Body>
                </Card><br />
              </Col>
            );
          }
        })}
      </Row>
    </Container>
  </>//}
}
