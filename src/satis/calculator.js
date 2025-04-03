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
    }

    return Object.keys(res);
}

function basic_recipe(rcname) {
    if (sources.includes(rcname)) {
        return "basic_resource";
    }

    let recipe = recipes[rcname];
    if (!recipe) {
        return "not_found";
    }

    recipe.name = rcname;
    return recipe;
}

function all_recipes(rcname) {
    if (sources.includes(rcname)) {
        return "basic_resource";
    }

    // Search for basic recipe
    let basic_recipe = recipes[rcname];
    if (!basic_recipe) {
        return "not_found";
    }
    basic_recipe.name = rcname;

    let res = [basic_recipe];
    // Search alt recipes
    for (let recipe of alt_recipes) {
        if (rcname == recipe.name) {
            res.push(recipe);
        }
    }

    return res;
}

function find_missing_recipes(rcname) {
    let res = {};
    let recipes = all_recipes(rcname);
    if (recipes === "basic_resource") {
        return res;
    }
    
    if (recipes === "not_found") {
        res[rcname] = true;
        return res;
    }

    for (let recipe of recipes) {
        for (let rc in recipe.ingredients) {
            res = Object.assign(res, find_missing_recipes(rc));
        }
    }

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
        if (recipes == "not_found" || recipes == "basic_resource") {
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