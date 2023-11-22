import React from 'react'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { AxiosAuth, Fetch } from 'toolbox/Fetch';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function PostPN({ post, state }) {
    const uri = `/work/anonymous/getPrevAndNext/${post.id}`

    function renderSuccess({data}) {
        console.log("누구세요?", data)
        const prev = data?.firstVal
        const next = data?.secondVal

        return <>
            {prev === null ? <Button variant="outline-dark" disabled>이전화 X</Button> :
                <Button variant="outline-success">
                    <Link style={{ all: "unset" }} key={post.id} to={`/post/${prev?.id}`}
                        state={{ id: prev?.id, page: state.page, post: prev, seriesId: state?.parentId, parentId: state?.parentId, boardId: post?.boardVO?.id }}>
                        이전화<AiOutlineCaretLeft color="red" /></Link></Button>}
            &nbsp;&nbsp;&nbsp;&nbsp;<b>{post.title}</b>&nbsp;&nbsp;&nbsp;&nbsp;
            {next === null ? <Button variant="outline-dark" disabled>X 다음화</Button> :
                <Button variant="outline-success"><Link style={{ all: "unset" }} key={post.id} to={`/post/${next?.id}`}
                    state={{ id: next?.id, page: state.page, post: next, seriesId: state?.parentId, parentId: state?.parentId, boardId: post?.boardVO?.id }}>
                    <AiOutlineCaretRight color="red" />다음화</Link></Button>}
        </>
    }
    return (
        <div>
            <AxiosAuth uri={uri} renderSuccess={renderSuccess} />
        </div>
    )
}
