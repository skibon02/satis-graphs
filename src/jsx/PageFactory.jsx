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
import { calculate, generateAltRecipes } from '../satis/calculator.js';
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
      .force('Y', forceY(0).strength(0.01))
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
  
const nodeTypes = { TargetResource, SourceResource, ResourceRecipe };
 
function PageFactory() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [initialized, { toggle, isRunning }, dragEvents] =
    useLayoutedElements();
 
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
    </>
  ); 
}
 
export default PageFactory;