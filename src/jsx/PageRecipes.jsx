import { useCallback, useState } from 'react';
import {
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TargetResource from '../NodeTypes/TargetResource.jsx';
import SourceResource from '../NodeTypes/SourceResource.jsx';
import { initial_edges, initial_nodes } from '../satis/calculator.js';
import React from 'react';
import { Background } from '@xyflow/react';
import { Controls } from '@xyflow/react';
 
const rfStyle = {
  backgroundColor: '#18232f',
};

const nodeTypes = { TargetResource, SourceResource };
 
function PageRecipes() {
  const [nodes, setNodes] = useState(initial_nodes);
  const [edges, setEdges] = useState(initial_edges);
 
  return (
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
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
 
export default PageRecipes;