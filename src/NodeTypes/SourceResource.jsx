import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'

const handleStyle = {
    right: -10
}
 
function SourceResource({ data, isConnectable }) {
  return (
    <div className="source-resource-node">
      <Handle
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