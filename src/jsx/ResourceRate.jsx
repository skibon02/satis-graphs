

function ResourceRate({ rcname, rate }) {
  const rounded_rate = Math.round(rate * 1000) / 1000;
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <div className="resource-rate-cont">
      <img src={`${baseUrl}satis-rc/${rcname}.webp`} />
      <p>{rounded_rate} / min</p>
    </div>
  );
}
 
export default ResourceRate;