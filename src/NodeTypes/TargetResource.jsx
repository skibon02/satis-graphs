import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ResourceWithamount from '../jsx/ResourceWithamount.jsx'

const handleStyle = {
    left: -10
}
 
function TargetResource({ data, isConnectable }) {
  return (
    <div className="target-resource-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <p>Target resource:</p>
      <ResourceWithamount rcname={data.rcname} amount={data.amount}/>
    </div>
  );
}
 
export default TargetResource;