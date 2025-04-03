import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TargetResource from './NodeTypes/TargetResource.jsx';
import SourceResource from './NodeTypes/SourceResource.jsx';
import MissingRecipesLogger from './jsx/MissingRecipesLogger.jsx';
import { initial_edges, initial_nodes } from './satis/calculator.js';
 
const rfStyle = {
  backgroundColor: '#18232f',
};
 

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { TargetResource, SourceResource };
 
function Flow() {
  const [nodes, setNodes] = useState(initial_nodes);
  const [edges, setEdges] = useState(initial_edges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
 
  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
        maxZoom={5}
      />
      <div className="floating">
        <MissingRecipesLogger />
      </div>
    </>
  );
}
 
export default Flow;