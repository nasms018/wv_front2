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
import FavoritesList from './FavoritesList';
import ReportList from './ReportList';
import MemberList from 'login/MemberList';
import UserSeries from 'login/UserSeries';
export default function List({
    uri,sortation,
    page, setPage = f => f,
    postList, setPostList = f => f,
}) {
    const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
    const { auth } = useContext(AppContext);
    const getPostListThenSet = async () => {
      try {
        const { data } = await axios.get(
            uri,
          {
            headers: {
              'Content-Type': 'application/json',
              "x-auth-token": `Bearer ${auth?.accessToken}`
            }
          }
        );
  
        setPostList(postList.concat(data?.firstVal));
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
  
    useEffect(() => {
      console.log('page ? ', page);
      getPostListThenSet();
    }, [page]);
  
    useEffect(() => {
      let observer;
      if (lastIntersectingImage) {
        observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
        observer.observe(lastIntersectingImage);
      }
      return () => observer && observer.disconnect();
    }, [lastIntersectingImage]);
  
    console.log(sortation);
  return (<>
    {sortation==="favorites"?
    <FavoritesList dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    {sortation==="report"?
    <ReportList dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    {sortation==="member"?
    <MemberList dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    {sortation==="userSeries"?
    <UserSeries dataList={postList} setLastIntersectingImage={setLastIntersectingImage} auth={auth}/>:""}
    </>
  )
}
