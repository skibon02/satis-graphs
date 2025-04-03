import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'

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
      <ResourceRate rcname={data.rcname} rate={data.rate}/>
    </div>
  );
}
 
export default TargetResource;