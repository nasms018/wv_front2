import React, { useEffect, useContext, useState } from 'react'
import { AxiosAuth } from 'toolbox/Fetch'
import axios from 'api/axios';
import AppContext from 'context/AppContextProvider';
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import OriginalViewOne from "atom/OriginalViewOne";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Favorites from './Favorites';

export default function FavoritesList({dataList, setLastIntersectingImage=f=>f}) {
  
 console.log(dataList)
  return (
    <Container>
      <Row>
        {dataList?.map((post, index) => {
          if (index === dataList.length - 1) {
            return (
              <Col id={post?.id} ref={setLastIntersectingImage}>

                <Card id={post?.id} style={{ width: '15rem' }} ><br />
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: post.boardVO.id }}>
                    {post.listAttachFile.length === 0 ?
                      <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" rounded />
                      : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                  </Link>
                  <Card.Body>
                    <Card.Title>{post?.title}
                      <AxiosAuth uri={`/work/isFavorites/${post.id}`} renderSuccess={(res) => {
                        return <><Favorites favorites={res?.data} post={post} /></>
                      }} />
                    </Card.Title>
                  </Card.Body>
                </Card><br />
              </Col>
            );
          } else {
            return (
              <Col id={post?.id}>

                <Card id={post?.id} style={{ width: '15rem' }} ><br />
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/series/${post.id}`} state={{ seriesId: post.id, post: post, page: 1, boardId: post.boardVO.id }}>
                    {post.listAttachFile.length === 0 ?
                      <Image src={process.env.PUBLIC_URL + `/images/WVseries.jpg`} width="200" height="auto" rounded />
                      : <OriginalViewOne imgDtoList={post.listAttachFile} x="200" y="auto" />}
                  </Link>
                  <Card.Body>
                    <Card.Title>{post?.title}
                      <AxiosAuth uri={`/work/isFavorites/${post.id}`} renderSuccess={(res) => {
                        return <><Favorites favorites={res?.data} post={post} /></>
                      }} />
                    </Card.Title>
                  </Card.Body>
                </Card><br />
              </Col>
            );
          }
        })}
      </Row>
    </Container>
  );
}


