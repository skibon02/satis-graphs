import React from "react";
import { all_recipes, get_all_known_resources } from "../satis/calculator";
import ResourceRateInput from "./ResourceRateInput";
import { useMemo } from "react";
import { sources } from "../satis/recipes_db";
import Select from 'react-select';
import {RcImage} from "./util.jsx"

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

    let all_resources = useMemo(() => {
        let all_resources = get_all_known_resources();

        let get_rc_name = (rcname) => {
            return rcname.replaceAll(/\-/gi, " ")
        }
        return all_resources.filter((r) => !sources.includes(r))
        .map(r=>{return {value: r, label: get_rc_name(r)}});
    }, []);
    
    return (
        <div className="target-selector">
            <p>Select target resources</p>
            <div>
                {targetSelectorItems}
                <Select 
                    placeholder="+ Add new target"
                    classNames={{
                        control: () => 'add-target-resource',
                        menu: () => 'add-target-resource-menu',
                        placeholder: () => 'add-target-resource-placeholder',
                        option: () => 'add-target-resource-option',
                    }}
                    onChange={(item) => {
                        let name = item.value;
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

                        return false;
                    }} 
                    formatOptionLabel={item => {
                        let rcname = item.value;
                        return (
                            <>
                                <RcImage rcname={rcname} />
                                <span>{item.label}</span>
                            </>
                        )
                    }}
                    value={null}
                    options={all_resources}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                />
            </div>
        </div>
    )
}

export default TargetSelector;