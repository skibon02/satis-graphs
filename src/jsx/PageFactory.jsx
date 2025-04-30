import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TargetResource from '../NodeTypes/TargetResource.jsx';
import SourceResource from '../NodeTypes/SourceResource.jsx';
import React from 'react';
import TargetSelector from './TargetSelector.jsx';
import SelectedRecipes from './SelectedRecipes.jsx';
import { calculate, generateAltRecipes, machines_total, power_multiplier, power_shards_max } from '../satis/calculator.js';
import { Background } from '@xyflow/react';
import { Controls } from '@xyflow/react';
import ResourceRecipe from '../NodeTypes/ResourceRecipe.jsx';
import { sources } from '../satis/recipes_db.js';
import { forceManyBody, forceSimulation, forceY } from 'd3-force';
import { edgeDirectionForce } from './collide.js';
import { useNodesState } from '@xyflow/react';
import { useEdgesState } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';
import { useNodesInitialized } from '@xyflow/react';
import FactoryStats from './FactoryStats.jsx';
import machines from '../satis/machines_db.js';
import SecondaryResource from '../NodeTypes/SecondaryResource.jsx';
 
const rfStyle = {
  backgroundColor: '#282330',
};

const simulation = forceSimulation()
  .alphaTarget(0.05)
  .stop();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const initialized = useNodesInitialized();
  
  // You can use these events if you want the flow to remain interactive while
  // the simulation is running. The simulation is typically responsible for setting
  // the position of nodes, but if we have a reference to the node being dragged,
  // we use that position instead.
  const draggingNodeRef = useRef(null);
  const dragEvents = useMemo(
    () => ({
      start: (_event, node) => (draggingNodeRef.current = node),
      drag: (_event, node) => (draggingNodeRef.current = node),
      stop: () => (draggingNodeRef.current = null),
    }),
    [],
  );

  const [updateId, setUpdateId] = useState(0);
  const triggerUpdate = () => {
    setUpdateId(updateId + 1);
  }
  
  return useMemo(() => {
    let nodes = getNodes().map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));
    let edges = getEdges().map((edge) => edge);

    let running = false;
  
    // If React Flow hasn't initialized our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialized || nodes.length === 0) return [false, {toggle: () => {}, isRunning: () => false}, dragEvents];


    simulation.nodes(nodes)
      .force('charge', forceManyBody().strength(-500))
      .force('Y', forceY(0).strength(0.007))
      .force('edges', edgeDirectionForce().strength(0.8).edges(edges))
    ;
  
    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      getNodes().forEach((node, i) => {
        const dragging = draggingNodeRef.current?.id === node.id;
  
        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that position and ignore any forces that would normally
        // cause it to move.
        if (dragging) {
          nodes[i].fx = draggingNodeRef.current.position.x;
          nodes[i].fy = draggingNodeRef.current.position.y;
        } else {
          delete nodes[i].fx;
          delete nodes[i].fy;
        }
      });
  
      simulation.tick();
      setNodes(
        nodes.map((node) => ({
          ...node,
          position: { x: node.fx ?? node.x, y: node.fy ?? node.y },
        })),
      );
  
      window.requestAnimationFrame(() => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        fitView();
  
        // If the simulation hasn't been stopped, schedule another tick.
        if (running) tick();
      });
    };
  
    const toggle = () => {
      if (!running) {
        getNodes().forEach((node, index) => {
          let simNode = nodes[index];
          Object.assign(simNode, node);
          simNode.x = node.position.x;
          simNode.y = node.position.y;
        });
      }
      running = !running;
      running && window.requestAnimationFrame(tick);

      if (!running) {
        triggerUpdate();
      }
      console.log("running (inside)", running)
    };
  
    const isRunning = () => running;
  
    return [true, { toggle, isRunning }, dragEvents];
  }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView, updateId]);
};
  
const nodeTypes = { TargetResource, SourceResource, ResourceRecipe, SecondaryResource };
 
function PageFactory() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [initialized, { toggle, isRunning }, dragEvents] =
    useLayoutedElements();
 
  const [targetResources, setTargetResources] = useState({});

  // key: rcname
  // value: recipeIndex
  const [selectedRecipes, setSelectedRecipes] = useState({});

  // key: rcname + recipeIndex
  // value: {powerShards: 1, somersloop: 0}
  const [selectedModifiers, setSelectedModifiers] = useState({});

  const [stats, setStats] = useState({secondaryOutputs: {}});

  useEffect(() => {
    const startTime = performance.now();
    
    let res = generateAltRecipes(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert ("Recursion detected!");
      return
    }
    const endTime = performance.now()
    console.log(`Updating alt recipes took ${endTime - startTime} milliseconds`)
    
    setSelectedRecipes(res)
  }, [targetResources])
  
  useEffect(() => {
    const startTime = performance.now();

    let res = calculate(targetResources, selectedRecipes, selectedModifiers);
    if (res == "recursion_detected") {
      const endTime = performance.now()
      alert("Recursion detected!");
      console.log(`Calculating factory recipes took ${endTime - startTime} milliseconds`)  
      
      return;
    }

    let total_consumption = 0;
    let total_power_shards = 0;
    let total_somersloops = 0;
    let new_nodes = [];
    let new_edges = [];

    let y_start = nodes.reduce((prev, cur) => Math.max(prev, cur.position.y), 0) + 500;
    let x_source = -800;
    let y_source = y_start;
    let x_recipe = 0;
    let y_recipe = y_start;
    let x_target = 800;
    let y_target = y_start;

    let sourceResources = {};
    let secondaryOutputs = {};


    for (let [rcname, rcinfo] of Object.entries(res)) {
      let rate = rcinfo.rate;
      let recipe = rcinfo.recipe;
      let recipe_output = rcname === recipe.name ? recipe.output : recipe.output2;
      let multiplier = rate / recipe_output;

      total_power_shards += rcinfo.cur_power_shards;
      total_somersloops += rcinfo.cur_somersloops;

      let set_modifiers = (power_shards, somersloops) => {
        let modified = {};
        Object.assign(modified, selectedModifiers);
        modified[rcname+selectedRecipes[rcname]] = {
          power_shards,
          somersloops,
        }
        setSelectedModifiers(modified)
      };

      if (rcinfo.recipe.machine) {
        // todo recalculate
        let base_consumption = rcinfo.recipe.machine && machines[rcinfo.recipe.machine].energy;
        let somersloop_factor = 0;
        if (machines[rcinfo.recipe.machine].somersloop_slots) {
          somersloop_factor = rcinfo.cur_somersloops / machines[rcinfo.recipe.machine].somersloop_slots
        }
        total_consumption += base_consumption * multiplier * power_multiplier(1 + rcinfo.cur_power_shards / multiplier * 0.5, somersloop_factor);
      }

      // secondary output check
      if (rcname === recipe.name && recipe.name2 || rcname === recipe.name2 && recipe.name) {
        let secondary_name = rcname === recipe.name ? recipe.name2 : recipe.name;
        let secondary_output = rcname === recipe.name ? recipe.output2 : recipe.output;
        
        if (!secondaryOutputs[secondary_name]) {
          secondaryOutputs[secondary_name] = 0;
        }
        secondaryOutputs[secondary_name] += secondary_output * multiplier;

        // add secondary output edge
        new_edges.push({
          id: 'secondary-out-' + rcname + 'secondary-' + secondary_name,
          source: 'recipe-' + rcname,
          sourceHandle: 'secondary-out-' + rcname,

          target: 'secondary-' + secondary_name,
        })
      }

      for (let ing in recipe.ingredients) {
        if (sources.includes(ing)) {
          let input_rate = multiplier * recipe.ingredients[ing] * rcinfo.ing_multiplier;
          if (sourceResources[ing]) {
            sourceResources[ing] += input_rate;
          }
          else {
            sourceResources[ing] = input_rate;
          }

          new_edges.push({
            id: 'source-' + ing + 'in-' + rcname + '-' + ing,
            source: 'source-' + ing,
            target: 'recipe-' + rcname,
            targetHandle: 'in-' + rcname + '-' + ing
          })
        }
        else {
          new_edges.push({
            id: 'out-' + ing + 'in-' + rcname + '-' + ing,

            source: 'recipe-' + ing,
            sourceHandle: 'out-' + ing,

            target: 'recipe-' + rcname,
            targetHandle: 'in-' + rcname + '-' + ing
          })
        }
      }

      let prev_node = nodes.find(v=>v.id == 'recipe-'+rcname);
      new_nodes.push({
        id: 'recipe-' + rcname,
        position: {
          x: prev_node ? prev_node.position.x : x_recipe,
          y: prev_node ? prev_node.position.y : y_recipe,
        },
        type: 'ResourceRecipe',
        data: {
          recipe,
          name: rcname,
          rcinfo,
          set_power_shards: (v) => {
            if (v instanceof Function) {
              set_modifiers(v(rcinfo.cur_power_shards), rcinfo.cur_somersloops)
            }
            else {
              set_modifiers(v, rcinfo.cur_somersloops)
            }
          },
          set_somersloops: (v) => {
            if (v instanceof Function) {
              set_modifiers(rcinfo.cur_power_shards, v(rcinfo.cur_somersloops))
            }
            else {
              set_modifiers(rcinfo.cur_power_shards, v)
            }
          },
        }
      });
      if (!prev_node) {
        y_recipe += 200;
      }
    }

    for (let rcname in sourceResources) {
      let prev_node = nodes.find(v=>v.id == 'source-' + rcname);
      new_nodes.push({
        id: 'source-' + rcname,
        position: {
          x: prev_node ? prev_node.position.x : x_source,
          y: prev_node ? prev_node.position.y : y_source,
        },
        type: 'SourceResource',
        data: {
          rcname,
          rate: sourceResources[rcname]
        }
      });
      if (!prev_node) {
        y_source += 200;
      }
    }

    for (let rcname in targetResources) {
      let prev_node = nodes.find(v=>v.id == 'target-' + rcname);
      new_nodes.push({
        id: 'target-' + rcname,
        position: {
          x: prev_node ? prev_node.position.x : x_target,
          y: prev_node ? prev_node.position.y : y_target,
        },
        type: 'TargetResource',
        data: {
          rcname,
          rate: targetResources[rcname]
        }
      });
      new_edges.push({
        id: 'out-' + rcname + 'target-' + rcname,
        source: 'recipe-' + rcname,
        sourceHandle: 'out-' + rcname,
        target: 'target-' + rcname,
      })
      if (!prev_node) {
        y_target += 200;
      }
    }

    // add secondary outputs nodes
    for (let [rcname, rate] of Object.entries(secondaryOutputs)) {
      let prev_node = nodes.find(v=>v.id == 'secondary-' + rcname);
      new_nodes.push({
        id: 'secondary-' + rcname,
        position: {
          x: prev_node ? prev_node.position.x : x_target,
          y: prev_node ? prev_node.position.y : y_target,
        },
        type: 'SecondaryResource',
        data: {
          rcname,
          rate
        }
      });
      if (!prev_node) {
        y_target += 200;
      }
    }

    const endTime = performance.now()
    console.log(`Calculating factory recipes took ${endTime - startTime} milliseconds`)  
    
    setEdges(new_edges);
    setNodes(new_nodes);
    setStats({energy: total_consumption, secondaryOutputs, total_power_shards, total_somersloops});
  }, [selectedRecipes, selectedModifiers])

  const onSelectRecipe = useCallback((recipe) => {
    selectedRecipes[recipe.name] = recipe.recipe_num;

    let res = generateAltRecipes(targetResources, selectedRecipes);
    if (res == "recursion_detected") {
      alert ("Recursion detected!");
      return
    }
    
    setSelectedRecipes(res);
  }, [targetResources, selectedRecipes]);
  
  return (
    <>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          
          fitView
          style={rfStyle}
          maxZoom={5}
          minZoom={0.1}
          nodesConnectable={false}
          elementsSelectable={false}

          onNodeDragStart={dragEvents.start}
          onNodeDrag={dragEvents.drag}
          onNodeDragStop={dragEvents.stop}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      <TargetSelector targetResources={targetResources} setTargetResources={setTargetResources} />
      <SelectedRecipes selectedRecipes={selectedRecipes} selectRecipe={onSelectRecipe} />
      <div className={isRunning() ? "unmangle active" : "unmangle"} onClick={toggle}>
        Unmangle
      </div>
      <FactoryStats stats={stats} />
    </>
  ); 
}
 
export default PageFactory;