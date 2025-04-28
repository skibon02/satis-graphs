import React from "react";
import { resourceIconUrl } from "./util";
import ResourceRate from "./ResourceRate";
import recycling from "../assets/recycling.png"
import somersloop from "../assets/Somersloop.webp"
import power_shard from "../assets/Power_Shard.webp"
import { memo } from "react";

const FactoryStats = ({stats}) => {
    let secondary_outputs = Object.entries(stats.secondaryOutputs).map(([rcname, rate]) => {
        return <ResourceRate key={rcname} rcname={rcname} rate={rate}/>
    });
    return (
        <div className="factory-stats">
            <p className="factory-stats-title">Factory stats</p>
            <div className="energy flex-row">
                <img className="icon" src={resourceIconUrl("energy")}/>
                <p>Energy: </p>
                <p className="value">{Math.round(stats.energy * 1000) / 1000}MJ</p>
            </div>
            <div className="secondary-outputs">
                <p className="flex-row"><img className="icon" src={recycling}/>Secondary outputs:</p>
                { secondary_outputs }
            </div>
            <div className="modifiers">
                <p className="flex-row"><img className="icon" src={power_shard}/>Power shards: {stats.total_power_shards}</p>
                <p className="flex-row"><img className="icon" src={somersloop}/>Somersloops: {stats.total_somersloops}</p>
            </div>
        </div>
    );
}

export default FactoryStats;
