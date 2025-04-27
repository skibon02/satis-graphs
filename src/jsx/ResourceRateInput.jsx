import React from "react";

function ResourceRateInput({ rcname, rate, setRate }) {
  const rounded_rate = Math.round(rate * 1000) / 1000;
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <div className="resource-rate-cont">
      <img src={`${baseUrl}satis-rc/${rcname}.webp`} />
      <p onClick={() => {
        let new_amount = +prompt("Enter new amount", rate);
        if (new_amount > 0) {
          setRate(new_amount);
        }
      }}>{rounded_rate} / min</p>
    </div>
  );
}
 
export default ResourceRateInput;
