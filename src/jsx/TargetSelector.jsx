import React from "react";
import { all_recipes } from "../satis/calculator";
import ResourceRateInput from "./ResourceRateInput";


function TargetSelector({targetResources, setTargetResources}) {
    let targetSelectorItems = Object.entries(targetResources).map(([name, rate]) => {
        return <div key={name}>
            <ResourceRateInput rcname={name} rate={rate} setRate={(new_rate)=>{
                let new_rc = Object.assign({}, targetResources);
                new_rc[name] = new_rate;
                setTargetResources(new_rc);
            }}/>
            <p 
                className="delete-btn"
                onClick={() => {
                    let new_rc = Object.assign({}, targetResources);
                    delete new_rc[name];
                    setTargetResources(new_rc);
                }}>Delete</p>
        </div>
    });
    
    return (
        <div className="target-selector">
            <p>Select target resources</p>
            <div>
                {targetSelectorItems}
                <div 
                    className="add-target-resource"
                    onClick={() => {
                        let name = prompt("Enter resource name", "smart-plating");
                        let recipes = all_recipes(name);
                        if (recipes == 'basic_resource') {
                            alert("Basic resource!");
                            return;
                        }
                        if (recipes.length == 0) {
                            alert("Incorrect resource name: " + name);
                            return;
                        }
                        let rate = +prompt("Enter desired production rate per minute");
                        if (!rate) {
                            alert("Incorrect production rate: " + +rate);
                            return;
                        }

                        let prev_rate = +(targetResources[name] ?? 0);
                        let res = {...targetResources};
                        res[name] = prev_rate + rate;
                        setTargetResources(res);
                    }}>
                    <p>+<br />Add target resource</p>
                </div>
            </div>
        </div>
    )
}

export default TargetSelector;