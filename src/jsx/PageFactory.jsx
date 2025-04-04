import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TargetResource from '../NodeTypes/TargetResource.jsx';
import SourceResource from '../NodeTypes/SourceResource.jsx';
import React from 'react';
import TargetSelector from './TargetSelector.jsx';
import SelectedRecipes from './SelectedRecipes.jsx';
import { all_recipes } from '../satis/calculator.js';
 
const rfStyle = {
  backgroundColor: '#282330',
};
 
function traverseResource(rcname, select_recipe, for_each = (a,b,c) => {}) {
  let rc_stack = [rcname];
  let visited = new Set();
  while (rc_stack.length > 0) {
    let rcname = rc_stack.shift();
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
    for_each(rcname, recipes, recipe_num);
    let recipe = recipes[recipe_num];


    let ingredients = Object.keys(recipe.ingredients);
    let rec_resolved = false;
    for (let ing of ingredients) {
      if (visited.has(ing)) {
        continue;
      }
      rec_resolved = true;
      rc_stack.push(ing)
    }
    if (!rec_resolved) {
      return "recursion_detected";
    }
  }
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

const nodeTypes = { TargetResource, SourceResource };
 
function PageFactory() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
 
  const [targetResources, setTargetResources] = useState({});
  const [selectedRecipes, setSelectedRecipes] = useState({});

  useEffect(() => {
    let res = generateAltRecipes(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert ("Recursion detected!");
      return
    }
    
    setSelectedRecipes(res)
  }, [targetResources])

  const onSelectRecipe = useCallback((recipe) => {
    selectedRecipes[recipe.name] = recipe.recipe_num;

    let res = generateAltRecipes(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert ("Recursion detected!");
      return
    }
    
    setSelectedRecipes(res)
  });
 
  return (
    <>
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
        maxZoom={5}
        minZoom={0.1}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      />
      <TargetSelector targetResources={targetResources} setTargetResources={setTargetResources} />
      <SelectedRecipes selectedRecipes={selectedRecipes} selectRecipe={onSelectRecipe} />
    </>
  );
}
 
export default PageFactory;