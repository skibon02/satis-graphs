import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'
import './style.css'
import React from 'react';

const handleStyle = {
    left: -10
}
 
function SecondaryResource({ data, isConnectable }) {
  return (
    <div className="secondary-resource-node">
      <Handle
        id={'secondary-' + data.rcname}
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <p>Secondary resource:</p>
      <ResourceRate rcname={data.rcname} rate={data.rate}/>
    </div>
  );
}
 
export default SecondaryResource;