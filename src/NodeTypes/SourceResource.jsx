import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'
import './style.css'
import React from 'react';

const handleStyle = {
    right: -10
}
 
function SourceResource({ data, isConnectable }) {
  return (
    <div className="source-resource-node">
      <Handle
        id={'source-' + data.rcname}
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <p>Source resource:</p>
      <ResourceRate rcname={data.rcname} rate={data.rate}/>
    </div>
  );
}
 
export default SourceResource;