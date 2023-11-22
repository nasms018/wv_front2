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
import Favorites from 'components/Favorites';
import FavoritesList from 'components/FavoritesList';
import ListSortation from 'components/ListSortation';

export default function UserSeriesPrev() {
    const { auth } = useContext(AppContext);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const uri = `/work/anonymous/listUserSeries/${auth.userId}/${page}`
    const [sortation] = useState("userSeries");

    return <ListSortation  page={page} setPage={setPage}
    postList={postList} setPostList={setPostList}
    uri={uri} sortation={sortation}
    />
}