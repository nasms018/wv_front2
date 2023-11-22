import React from 'react';
import { AxiosPost } from 'toolbox/Fetch';


export default function OriginalViewOne({ imgDtoList, x,y, d }) {
    const thumbnailRequestTarget = ["video", "image"];

    function renderImg(afdto, blob) {
        const thumbFile = new File([blob.data], "image");
        const imgUrl = (window.URL || window.webkitURL).createObjectURL(thumbFile);
        return  <div> <img src={imgUrl} class={d} width={x} height={y} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=process.env.PUBLIC_URL + `/images/WVseries.jpg`;
          }} alt='' /></div>
    }

    return <>
        {imgDtoList?.filter((afdto, index) => index === 0).map(afdto => {
            if (thumbnailRequestTarget.includes(afdto.contentType)) {
                return <AxiosPost uri={`/attach/anonymous/getOriginalFile`} body={afdto}
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
