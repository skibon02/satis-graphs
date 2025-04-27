import React from "react";

function resourceIconUrl(rcname) {
    const baseUrl = import.meta.env.BASE_URL;
    return `${baseUrl}satis-rc/${rcname}.webp`;
}
  

function RcImage({ rcname }) {
    return (
        <img className="icon" src={resourceIconUrl(rcname)} />
    );
}

export { RcImage, resourceIconUrl };