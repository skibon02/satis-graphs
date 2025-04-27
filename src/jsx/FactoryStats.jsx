import React from "react";
import { resourceIconUrl } from "./util";
import ResourceRate from "./ResourceRate";
import recycling from "../assets/recycling.png"

const FactoryStats = ({stats}) => {
    let secondary_outputs = Object.entries(stats.secondaryOutputs).map(([rcname, rate]) => {
        return <ResourceRate rcname={rcname} rate={rate}/>
    });
    return (<div className="factory-stats">
            <p className="factory-stats-title">Factory stats</p>
            <div className="energy flex-row">
                <img src={resourceIconUrl("energy")}/>
                <p>Energy: </p>
                <p className="value">{Math.round(stats.energy * 1000) / 1000}MJ</p>
            </div>
            <div className="secondary-outputs">
                <p className="flex-row"><img src={recycling}/>Secondary outputs:</p>
                { secondary_outputs }
            </div>
        </div>);
}
export default FactoryStats;