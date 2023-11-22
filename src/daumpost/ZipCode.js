import React from 'react';
import DaumPostcode from "react-daum-postcode";

export const ZipCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    console.log(fullAddress)
    props.setAddress(fullAddress)

  }

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
    background: "rgba(0,0,0,0.25)",
    border: "solid"
  };

  return (
    <div>
      <div class="container">
        <div class="layer-popup show" id="layer-popup">
          <div class="modal-dialog">
            <div class="modal-content">
              <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

