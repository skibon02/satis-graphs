import React from "react";
import {check_all_recipes} from "../satis/calculator";

const missing_recipes = check_all_recipes();

const MissingRecipesLogger = () => {

    let missing_list = missing_recipes.map((missing_rc) => {
        return <p key={missing_rc} className="missing-resource">{missing_rc}</p>;
    });

    if (missing_list.length > 0) {
        return (<div className="missing-resource-list">
            <p className="missing-resource-title">Missing recipes:</p>
            {missing_list}
        </div>)
    }
    else {
        return <></>
    }
}

export default MissingRecipesLogger;