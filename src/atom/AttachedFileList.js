import axios from 'api/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AttachFile from './AttachFile';

export default function AttachedFileList({ writer, listAttach, setListAttach=f=>f, multiple = true }) {

  const [contentFilter, setContentFilter] = useState([]);
  const [업로드파일기억장치, set업로드파일기억장치] = useState([]);
  const [imgDtoList, setImgDtoList] = useState([]);


  function onFileSelect(finedAndHeaders) {
    let files = [], headers = [];
    finedAndHeaders.forEach(({ file, header }) => {
      if (!contentFilter.includes(header) && !headers.includes(header)) {
        files.push(file);
        headers.push(header);
      }
    });
    if (files.length > 0) {
      setContentFilter([...contentFilter, ...headers]);
      set업로드파일기억장치([...업로드파일기억장치, ...files]);
    }
  }

  const handleAttach = (e) => {
    e.preventDefault();
    if (업로드파일기억장치.length === 0)
      return;
    const formData = new FormData();
    console.log("얼마나 실행되나=====111====")
    Array.from(업로드파일기억장치).forEach((file) => {
      formData.append("attachFiles", file);
    });
    axios.post(`/attach/upload_multi`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": `Bearer ${writer?.accessToken}`
        }
      }).then(res => {
        const listDto = res.data;
        console.log("얼마나 실행되나=====222====")
        setImgDtoList(listDto);
        setListAttach([...listAttach, ...listDto]);
      }).catch((error) => {
        console.log(error);
      }).finally(()=>{
        set업로드파일기억장치([]);
      });
    console.log("handleAttach Done");
  }

  return <Form.Group className="mb-3" >
    <Form.Label htmlFor="username"></Form.Label>
    <table style={{ display: "inline-block" }}><tr><td>
    <AttachFile onFileSelect={onFileSelect} /></td><td>
    <Button variant="outline-warning" onClick={handleAttach}>
      첨부
    </Button></td></tr></table>
  </Form.Group>
}