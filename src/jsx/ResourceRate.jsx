import React from "react";
import { resourceIconUrl } from "./util";

function ResourceRate({ rcname, rate }) {
  const rounded_rate = Math.round(rate * 1000) / 1000;
  
  return (
    <div className="resource-rate-cont">
      <img src={resourceIconUrl(rcname)} />
      <p>{rounded_rate} / min</p>
    </div>
  );
}
 
export default ResourceRate;
