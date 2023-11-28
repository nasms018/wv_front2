import React, { useState } from 'react';
import { AxiosPost } from 'toolbox/Fetch';
import OriginalFileView from './OriginalFileView';

export default function ThumbnailList({  imgDtoList, x,y }) {
    const thumbnailRequestTarget = ["video", "image"];

    function renderImg(afdto, blob) {
        console.log("뭐야 뭐야 뭐가 온 거야", afdto, blob)
        const thumbFile = new File([blob.data], "image");
        const imgUrl = (window.URL || window.webkitURL).createObjectURL(thumbFile);
        return <OriginalFileView imgUrl={imgUrl} afdto={afdto}/>
    }

    console.log("검증 시작", imgDtoList)

    return <>
        {imgDtoList?.map(afdto => {
            console.log("너 dto 맞아?", afdto)
            if (thumbnailRequestTarget.includes(afdto.contentType)) {
                return <AxiosPost uri={`/attach/anonymous/displayThumbnail`} body={afdto}
                    renderSuccess={renderImg} />
            } else if (afdto.contentType === "audio") {
                const imgUrl = process.env.PUBLIC_URL + "/images/audio.png";
                return <img src={imgUrl} />;
            } else {
                const imgUrl = process.env.PUBLIC_URL + "/images/unknown.png";
                return <img src={imgUrl} />;
            }
        })}
    </>
}
