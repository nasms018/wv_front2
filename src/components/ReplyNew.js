import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ReplyNew({ auth, reply, replayOnReply, onInputReplyContent, mngReply = f => f }) {
    if (!auth.userId)
        return;

    return (<>
        <Container>
            <Row>
                <Col sm={10}>
                    <input placeholder='댓글 달기'
                        value={replayOnReply.get(reply?.id)}
                        style={{ height: "100%", width: "100%" }}
                        onInput={(e) => onInputReplyContent(e, reply?.id, false)} />
                </Col>
                <Col sm><Button size="sm" variant="outline-primary" onClick={(e) => { mngReply(e, reply?.id) }}>적용</Button></Col>
            </Row>
        </Container>


    </>);
}

export default ReplyNew;