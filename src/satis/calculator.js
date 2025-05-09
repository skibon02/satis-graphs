import machines from './machines_db.js';
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

const recipes_cache = {};
function all_recipes(rcname) {
    if (sources.includes(rcname)) {
        return "basic_resource";
    }

    if (recipes_cache[rcname]) {
      return recipes_cache[rcname];
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

    for (let i = 0; i < res.length; i++) {
        if (res[i].base && res[i].name === rcname) {
            let tmp = res[0];
            res[0] = res[i];
            res[i] = tmp;
            break;
        }
    }

    recipes_cache[rcname] = res;
    return res;
}


function traverseResource(rcname, select_recipe, rate = 0, for_each = (rcname, recipe, rate, cur_path) => {}, path = new Set()) {
    if (path.has(rcname)) {
        return "recursion_detected"; // нашли цикл, возвращаем сигнал наверх
    }
    path.add(rcname);

    let recipes = all_recipes(rcname);
    if (recipes === "basic_resource") {
        path.delete(rcname);
        return; // конец ветки
    }

    let recipe_num;
    if (recipes.length > 1) {
        recipe_num = select_recipe(rcname, recipes);
    } else {
        recipe_num = 0;
    }
    let recipe = recipes[recipe_num];

    for_each(rcname, recipe, rate, path); // делаем что-то полезное с рецептом

    let out_rate = recipe.name === rcname ? recipe.output : recipe.output2;

    for (let ing in recipe.ingredients) {
        let ing_rate = rate / out_rate * recipe.ingredients[ing];
        let result = traverseResource(ing, select_recipe, ing_rate, for_each, path);
        if (result === "recursion_detected") {
            return "recursion_detected";
        }
    }

    path.delete(rcname); // откатываем путь обратно при выходе
}


const missing_recipes_checked = {};
function find_missing_recipes(rcname, callStack = new Set()) {
    if (callStack.has(rcname)) {
        return {};
    }

    if (missing_recipes_checked[rcname]) {
        return {};
    }

    let res = {};
    let recipes = all_recipes(rcname);
    
    if (recipes === "basic_resource") {
        missing_recipes_checked[rcname] = true;
        return res;
    }
    
    if (recipes.length == 0) {
        res[rcname] = true;
        missing_recipes_checked[rcname] = true;
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

    missing_recipes_checked[rcname] = true;
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

function calculate(targetResources, cur_alt_recipes, selectedModifiers) {
    // 1) generate initial ingredient sets
    const ing_set = {};
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
            (rcname, recipe, rate, path) => {
                for (let parent of path) {
                    if (!ing_set[parent]) {
                        ing_set[parent] = new Set();
                    }
                    for (let ing in recipe.ingredients) {
                        ing_set[parent].add(ing);
                    }
                }
            }
        ); //4
        if (traverse_res == "recursion_detected") {
            console.error(`Recursion detected at ${rc} during phase 1 (ingredient sets)`);
            return "recursion_detected";
        }
    }

    // 2) Go through each resource and collect recipes
    // rcname => rate (number)
    let workingSet = Object.assign({}, targetResources);
    let res = {};

    const ing_set_count = (rc) => {
        let res = 0
        for (let working_rc in workingSet) {
            if (ing_set[working_rc] && ing_set[working_rc].has(rc)) {
                res++;
            }
        }
        return res;
    };

    while (Object.keys(workingSet).length > 0) {
        // 2.1) Find resource ready to be fully calculated
        let handled = false
        for (let [rc, rate] of Object.entries(workingSet)) {
            if (ing_set_count(rc) == 0) {
                // 2.2) Found resource. can proceed with calculation
                let recipes = all_recipes(rc);
                if (recipes === "basic_resource") {
                    // just remove from working set
                    delete workingSet[rc];
                    handled = true;
                    break;
                }

                // 2.3) select alt recipe
                let recipe_num = 0;
                if (cur_alt_recipes[rc]) {
                    recipe_num = cur_alt_recipes[rc];
                }
                let recipe = recipes[recipe_num];
                
                // 2.4) remove from working set, calculate current recipe
                delete workingSet[rc];
                let primary_output = recipe.name === rc ? recipe.output : recipe.output2;
                let base_machines_cnt = rate / primary_output;
                let max_power_shards = power_shards_max(base_machines_cnt);

                // restore desired amount
                let cur_power_shards = 0;
                let cur_somersloops = 0;
                if (selectedModifiers[rc + cur_alt_recipes[rc]]) {
                  cur_power_shards = selectedModifiers[rc + cur_alt_recipes[rc]].power_shards;
                  cur_somersloops = selectedModifiers[rc + cur_alt_recipes[rc]].somersloops;
                }

                // limit
                cur_power_shards = Math.min(cur_power_shards, max_power_shards);
                let machines_with_power_shards = machines_total(base_machines_cnt, cur_power_shards);
                let max_somersloops = machines_with_power_shards * machines[recipe.machine].somersloop_slots;
                if (isNaN(max_somersloops)) debugger;
                cur_somersloops = Math.min(cur_somersloops, max_somersloops);

                // calculate actual machines_cnt
                const machines_cnt = machines_with_power_shards;

                const ing_multiplier = max_somersloops > 0 ? 1 / (1 + cur_somersloops / max_somersloops) : 1;

                res[rc] = {
                    rate,
                    recipe,
                    base_machines_cnt,
                    machines_cnt,
                    ing_multiplier,

                    cur_power_shards,
                    cur_somersloops,
                    max_power_shards,
                    max_somersloops,
                }

                // 2.5) update working set from ingredients
                for(let ing in recipe.ingredients) {
                    let ing_rate = base_machines_cnt * recipe.ingredients[ing] * ing_multiplier;
                    if (!(ing in workingSet)) {
                        workingSet[ing] = 0;
                    }
                    workingSet[ing] += ing_rate;
                }

                handled = true;
                break;
            }
        }

        // Targets have each other in ingredients set => error
        if (!handled) {
            console.error(`Recursion detected during phase 2 (calculation)`);
            console.dir(workingSet);
            return "recursion_detected";
        }
    }
  
    return res;
}


function power_multiplier(overclock_speed, somersloop_filled) {
    return Math.pow(1+somersloop_filled, 2)*Math.pow(overclock_speed, 1.321928)
}

function machines_total(machine_requirement, power_shards) {
    return Math.ceil(machine_requirement - (power_shards * 0.5));
}
function power_shards_max(machines_requirement) {
    let tmp_shards = 0;
    while (Math.ceil(tmp_shards / 3)<=machines_total(machines_requirement, tmp_shards)) {
        tmp_shards++;
    }
    return tmp_shards - 1;
}

const [initial_nodes, initial_edges] = get_all_recipes(); 

export {check_all_recipes, get_all_recipes, 
    initial_nodes, initial_edges, all_recipes, 
    generateAltRecipes, calculate, get_all_known_resources, 
    power_multiplier, machines_total, power_shards_max};