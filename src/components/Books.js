import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import Loading from 'toolbox/Loading';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
const Books = ({ title }) => {
    const [query, setQuery] = useState('웹툰');
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);
    const [documents, setDocuments] = useState(null);
    const [xSize] = useState(230);
    const [ySize] = useState("auto");
    console.log(documents)
    const callAPI = async () => {
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&page=${page}`;
        const config = { headers: 'Authorization: KakaoAK 248bbf725d08a367356e79cf03f2859a' };
        const result = await axios(url, config);
        console.log(result);
        setDocuments(result.data.documents);
        const total = result.data.meta.pageable_count;
        setLast(Math.ceil(total / 10))
    }

    useEffect(() => {
        callAPI();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }

    if (documents === null) {
        return <Loading />
    }
    console.log(documents)
    return (
        <div>
            <table style={{ margin: "auto", position: "static" }} ><td>
                <Form.Control type="text" placeholder='검색어' value={query} onChange={(e) => setQuery(e.target.value)} />
            </td><td>
                    <Button variant="outline-danger" onClick={onSubmit}>검색</Button> </td>
            </table>
            {/*<form onSubmit={onSubmit}></form>*/}
            <Container><Row>
                {documents.map(data => (
                    <Col xs={3}>
                        <div className='box'>
                            {console.log(data)}
                            <Card id={data?.isbn} style={{ width: '15rem' }} >
                                <img src={data.thumbnail ? data.thumbnail : 'http://via.placeholder.com/120X150'} width={xSize} height={ySize} alt="" />
                                <Card.Body>
                                    <Card.Title>
                                        <div>{data.title}</div>
                                        <div>{data.authors[0]}</div>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row></Container>
            <div>
                <Button variant="outline-success" onClick={() => setPage(page - 1)} disabled={page === 1}>이전<AiOutlineCaretLeft color="red" /></Button>
                <span style={{ margin: '10px' }}>{page}/{last}</span>
                <Button variant="outline-success" onClick={() => setPage(page + 1)} disabled={page === last}><AiOutlineCaretRight color="red" />다음</Button>
            </div>

        </div>
    )
}
export default Books