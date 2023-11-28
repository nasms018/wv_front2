import { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'api/axios';

export default function OriginalFileView({imgUrl, afdto}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [originalFileUrl, setOriginalFileUrl] = useState(false);

  const buildUri = (blob) => {
    console.log("buildUri = (blob)", blob);
    const originalFile = new File([blob.data], afdto.originalFilePureName, {type : afdto.contentType});
    setOriginalFileUrl((window.URL || window.webkitURL).createObjectURL(originalFile));
    setShow(true);
  }

  const getOriginalFile = () => {
    console.log("꺅, 눌렸다!")
    axios.post(`/attach/anonymous/getOriginalFile`, afdto,
        {
            headers: { "Content-Type": "application/json" },
            responseType: "blob"
        })
        .then(buildUri)
        .catch(error=>{
            console.log("getOriginalFile", error);
            
        });

  }

  console.log("날 어디로 보내려는 거야?", imgUrl)
  console.log("뭐랑 같이 보내려는 거야?", afdto)

  return <>
      <img src={imgUrl} onClick={(e) => {getOriginalFile()}} />
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>{afdto.originalFilePureName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
                {afdto.contentType === "image" ? <img src={originalFileUrl}/>:
                afdto.contentType === "video" ? <video src={originalFileUrl} controls autoPlay/>: null
                }
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
}
