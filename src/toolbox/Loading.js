import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <Spinner animation="border" role="status">
    <span className="visually-hidden">로그인 중입니다....</span>
    </Spinner>
  )
}
