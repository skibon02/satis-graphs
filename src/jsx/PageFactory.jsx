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
import { all_recipes, calculate, generateAltRecipes } from '../satis/calculator.js';
import { Background } from '@xyflow/react';
import { Controls } from '@xyflow/react';
import ResourceRecipe from '../NodeTypes/ResourceRecipe.jsx';
import { sources } from '../satis/recipes_db.js';
import { applyNodeChanges } from '@xyflow/react';
 
const rfStyle = {
  backgroundColor: '#282330',
};


const nodeTypes = { TargetResource, SourceResource, ResourceRecipe };
 
function PageFactory() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
 
  const [targetResources, setTargetResources] = useState({});
  const [selectedRecipes, setSelectedRecipes] = useState({});
  const [calculatedRecipes, setCalculatedRecipes] = useState({});

  useEffect(() => {
    let res = generateAltRecipes(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert ("Recursion detected!");
      return
    }
    
    setSelectedRecipes(res)
  }, [targetResources])
  
  useEffect(() => {
    let res = calculate(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert("Recursion detected!");
      return;
    }

    let nodes = [];
    let edges = [];

    let sourceResources = {};

    let cnt = 0;
    for (let [rcname, recipe_info] of Object.entries(res)) {
      let rate = recipe_info.rate;
      let recipe = recipe_info.recipe;

      let recipe_output = rcname === recipe.name ? recipe.output : recipe.output2;
      for (let ing in recipe.ingredients) {
        if (sources.includes(ing)) {
          let input_rate = rate / recipe_output * recipe.ingredients[ing];
          if (sourceResources[ing]) {
            sourceResources[ing] += input_rate;
          }
          else {
            sourceResources[ing] = input_rate;
          }

          edges.push({
            id: Math.random(),
            source: 'source-' + ing,
            target: 'recipe-' + recipe.name,
            targetHandle: 'in-' + recipe.name + '-' + ing
          })
        }
        else {
          edges.push({
            id: Math.random(),

            source: 'recipe-' + ing,
            sourceHandle: 'out-' + ing,

            target: 'recipe-' + recipe.name,
            targetHandle: 'in-' + recipe.name + '-' + ing
          })
        }
      }

      nodes.push({
        id: 'recipe-' + rcname,
        position: {
          x: 0,
          y: cnt * 200,
        },
        type: 'ResourceRecipe',
        data: {
          rate,
          recipe,
          name: rcname
        }
      });
      cnt++;
    }

    cnt = 0;
    for (let rcname in targetResources) {
      nodes.push({
        id: 'target-' + rcname,
        position: {
          x: 500,
          y: cnt * 200,
        },
        type: 'TargetResource',
        data: {
          rcname,
          rate: targetResources[rcname]
        }
      });
      edges.push({
        id: Math.random(),
        source: 'recipe-' + rcname,
        sourceHandle: 'out-' + rcname,
        target: 'target-' + rcname,
      })
      cnt++;
    }


    cnt = 0;
    for (let rcname in sourceResources) {
      nodes.push({
        id: 'source-' + rcname,
        position: {
          x: -500,
          y: cnt * 200,
        },
        type: 'SourceResource',
        data: {
          rcname,
          rate: sourceResources[rcname]
        }
      });
      cnt++;
    }

    setEdges(edges);
    setNodes(nodes);

  }, [selectedRecipes])

  const onSelectRecipe = useCallback((recipe) => {
    selectedRecipes[recipe.name] = recipe.recipe_num;

    let res = generateAltRecipes(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert ("Recursion detected!");
      return
    }
    
    setSelectedRecipes(res);
  });
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        
        fitView
        style={rfStyle}
        maxZoom={5}
        minZoom={0.1}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <TargetSelector targetResources={targetResources} setTargetResources={setTargetResources} />
      <SelectedRecipes selectedRecipes={selectedRecipes} selectRecipe={onSelectRecipe} />
    </>
  );
}
 
export default PageFactory;