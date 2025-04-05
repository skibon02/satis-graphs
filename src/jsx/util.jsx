import React from "react";


function RcImage({ rcname }) {
    const baseUrl = import.meta.env.BASE_URL;
    
    return (
        <img className="icon" src={`${baseUrl}satis-rc/${rcname}.webp`} />
    );
}

export { RcImage };