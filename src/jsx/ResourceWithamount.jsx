

function ResourceWithamount({ rcname, amount }) {
  return (
    <div className="resource-with-amount-cont">
      <img src={"/satis-rc/" + rcname + ".webp"} />
      <p>x{amount}</p>
    </div>
  );
}
 
export default ResourceWithamount;