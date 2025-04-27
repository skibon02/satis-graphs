import {recipes, sources} from './recipes_db.js'

function get_all_known_resources() {
    let res = {};

    for (let name of sources) {
        res[name] = true;
    }
    for (let recipe of recipes) {
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

    let res = []

    // Search recipes
    for (let recipe of recipes) {
        if (rcname == recipe.name) {
            res.push(recipe);
        }

        if (rcname == recipe.name2) {
            res.push(recipe);
        }
    }

    return res;
}


 
function traverseResource(rcname, select_recipe, rate=0, for_each = (rcname, recipe, rate) => {}) {
  let rc_stack = [{rcname, rate}];
  let visited = new Set();
  while (rc_stack.length > 0) {
    let rc = rc_stack.shift();
    let rcname = rc.rcname;
    let rcrate = rc.rate;

    let recipes = all_recipes(rcname);
    if (recipes === "basic_resource") {
      continue;
    }

    let recipe_num;
    if (recipes.length > 1) {
      // use callback to determine recipe
      recipe_num = select_recipe(rcname, recipes);
    }
    else {
      recipe_num = 0;
    }
    let recipe = recipes[recipe_num];
    for_each(rcname, recipe, rcrate);


    let rec_resolved = false;
    for (let ing in recipe.ingredients) {
      if (visited.has(ing)) {
        continue;
      }
      rec_resolved = true;

      let out_rate = recipe.name === rcname ? recipe.output : recipe.output2;
      rc_stack.push({
        rcname: ing,
        rate: rcrate / out_rate * recipe.ingredients[ing],
      })
    }
    if (!rec_resolved) {
      return "recursion_detected";
    }
  }
}

function find_missing_recipes(rcname, callStack = new Set()) {
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


function generateAltRecipes(targetResources, cur_alt_recipes) {
  let res = {};

  for (let rc in targetResources) {
    let traverse_res = traverseResource(rc, (rcname, recipes) => {
      if (cur_alt_recipes[rcname]) {
        res[rcname] = cur_alt_recipes[rcname];
        return cur_alt_recipes[rcname];
      }
      else {
        res[rcname] = 0;
        return 0;
      }
    });
    if (traverse_res == "recursion_detected") {
      return "recursion_detected";
    }
  }

  return res;
}

function calculate(targetResources, cur_alt_recipes) {
    let res = {};

    for (let rc in targetResources) {
      let traverse_res = traverseResource(
        rc, //1
        (rcname, recipes) => {
            if (cur_alt_recipes[rcname]) {
            return cur_alt_recipes[rcname];
            }
            else {
            return 0;
            }
        }, //2
        targetResources[rc], //3
        (rcname, recipe, rate) => {
            if (res[rcname]) {
                res[rcname].rate += rate;
            }
            else {
                res[rcname] = {
                    rate,
                    recipe
                }
            }
        }); //4
      if (traverse_res == "recursion_detected") {
        return "recursion_detected";
      }
    }
  
    return res;
}

const [initial_nodes, initial_edges] = get_all_recipes(); 

export {check_all_recipes, get_all_recipes, initial_nodes, initial_edges, all_recipes, generateAltRecipes, calculate, get_all_known_resources};