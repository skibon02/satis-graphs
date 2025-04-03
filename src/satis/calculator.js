import {recipes, sources, alt_recipes} from './recipes_db.js'

function get_all_known_resources() {
    let res = {};

    for (let name in recipes) {
        res[name] = true;
    }
    for (let name of sources) {
        res[name] = true;
    }
    for (let recipe of alt_recipes) {
        let name = recipe.name;
        res[name] = true;

        if (recipe.name2) {
            res[recipe.name2] = true;
        }
    }

    return Object.keys(res);
}

function all_recipes(rcname) {
    if (sources.includes(rcname)) {
        return "basic_resource";
    }

    // Search for basic recipe
    let basic_recipe = recipes[rcname];
    let res = []
    if (basic_recipe) {
        basic_recipe.name = rcname;
        res.push(basic_recipe);
    }

    // Search alt recipes
    for (let recipe of alt_recipes) {
        if (rcname == recipe.name) {
            res.push(recipe);
        }

        if (rcname == recipe.name2) {
            res.push(recipe);
        }
    }

    return res;
}

function find_missing_recipes(rcname, callStack = new Set()) {
    // If this recipe is already in the call stack, we've found a cycle - skip it
    if (callStack.has(rcname)) {
        return {};
    }

    let res = {};
    let recipes = all_recipes(rcname);
    
    if (recipes === "basic_resource") {
        return res;
    }
    
    if (recipes.length == 0) {
        res[rcname] = true;
        return res;
    }

    callStack.add(rcname);
    for (let recipe of recipes) {
        for (let rc in recipe.ingredients) {
            // Pass down the call stack to child calls
            let missing = find_missing_recipes(rc, new Set(callStack));
            res = Object.assign(res, missing);
        }
    }
    callStack.delete(rcname);

    return res;
}

function check_all_recipes() {
    let res = {};

    let resources = get_all_known_resources();
    for (let rc of resources) {
        res = Object.assign(res, find_missing_recipes(rc));
    }

    return Object.keys(res);
}

function get_all_recipes() {
    let nodes = [];
    let edges = [];

    let resources = get_all_known_resources();
    let cnt = 0;
    let ingcnt = 0;
    for (let rc of resources) {
        let recipes = all_recipes(rc);
        if (recipes == "basic_resource") {
            continue;
        }

        let max_ing_length = 1;
        let recipe_i = 0;
        for(let recipe of recipes) {
            let ingredients_cnt = Object.keys(recipe.ingredients).length;
            let vertical_offset = (ingredients_cnt - 1) * 50;
            if (ingredients_cnt > max_ing_length) {
                max_ing_length = ingredients_cnt;
            }
            nodes.push({
                id: 'out' + cnt,
                type: 'TargetResource',
                position: { x: 300 + recipe_i * 600, y: ingcnt*100 + vertical_offset },
                data: {rcname: recipe.name, rate: recipe.output}
            })
            if (recipe.name2) {
                nodes.push({
                    id: 'out2_' + cnt,
                    type: 'TargetResource',
                    position: { x: 300 + recipe_i * 600, y: ingcnt*100 + vertical_offset + 100 },
                    data: {rcname: recipe.name2, rate: recipe.output2}
                })
                edges.push({
                    id: 'out_e' + cnt,
                    source: 'out' + cnt,
                    target: 'out2_' + cnt,
                })
            }

            for(let ing in recipe.ingredients) {
                nodes.push({
                    id: 'in' + ing + cnt,
                    type: 'SourceResource',
                    position: { x: recipe_i * 600, y: ingcnt*100},
                    data: {rcname: ing, rate: recipe.ingredients[ing]}
                });

                edges.push({
                    id: 'e' + ing + cnt,
                    source: 'in' + ing + cnt,
                    target: 'out' + cnt,
                })

                ingcnt++;
            }

            cnt++;
            recipe_i++;

            ingcnt -= ingredients_cnt;
        }

        ingcnt += max_ing_length + 1;
    }

    return [nodes, edges];
}

const [initial_nodes, initial_edges] = get_all_recipes(); 

export {check_all_recipes, get_all_recipes, initial_nodes, initial_edges};