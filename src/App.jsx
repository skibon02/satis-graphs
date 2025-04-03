import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
import TargetResource from './NodeTypes/TargetResource.jsx';
 
const rfStyle = {
  backgroundColor: '#18232f',
};
 
const spread = 300;
const initialNodes = [
  {
    id: 'node-1',
    type: 'TargetResource',
    position: { x: Math.random() * spread, y: Math.random() * spread },
    data: { rcname: 'iron-ingot', amount: 25},
  },
  {
    id: 'node-2',
    type: 'TargetResource',
    position: { x: Math.random() * spread, y: Math.random() * spread },
    data: { rcname: 'iron-ingot', amount: 13},
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { TargetResource };
 
function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
 
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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}
 
export default Flow;