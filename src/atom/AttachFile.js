import React from 'react';
import Form from 'react-bootstrap/Form';

export default function AttachFile({ onFileSelect = f => f }) {
    const allowedFileTypes = "image/*, audio/*, video/*, application/x-zip-compressed, text/*";

    const handleChooseFile = (e) => {
        const allowedTypeReg = allowedFileTypes.split(", ");
        const 허용목록파일들 = Array.from(e.target.files).filter((file) => {
            const { type } = file;
            return allowedTypeReg.filter(regExp => type.match(regExp)).length > 0;
        });

        let collecionOfFileAndHeader = []; 
        허용목록파일들.forEach((file) => {
            console.log(file.name + " 파일을 readAsDataURL로 내용 읽기 요청합니다");
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(file.name + " 파일 내용 load 이후에...");
                const header = e.target.result.substring(0, 1000);

                collecionOfFileAndHeader.push({ file, header });
                if (허용목록파일들.length === collecionOfFileAndHeader.length) {
                    onFileSelect(collecionOfFileAndHeader);
                }
            }
        });
    }

    return <Form.Control
        type="file"
        multiple
        id="fileInput"
        onChange={handleChooseFile}
        accept={allowedFileTypes} 
        />
}
