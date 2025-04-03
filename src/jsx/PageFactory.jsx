import { useCallback, useState } from 'react';
import {
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TargetResource from '../NodeTypes/TargetResource.jsx';
import SourceResource from '../NodeTypes/SourceResource.jsx';
import { initial_edges, initial_nodes } from '../satis/calculator.js';
import React from 'react';
import TargetSelector from './TargetSelector.jsx';
 
const rfStyle = {
  backgroundColor: '#282330',
};
 

const nodeTypes = { TargetResource, SourceResource };
 
function PageFactory() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
 
  const [targetResources, setTargetResources] = useState({});
 
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
    </>
  );
}
 
export default PageFactory;