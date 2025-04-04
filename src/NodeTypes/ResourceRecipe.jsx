import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'
import React from 'react';
import './style.css'

function ResourceRecipe({ data, isConnectable }) {
  let inputs = Object.entries(data.recipe.ingredients).map(([ing, inp_rate]) => {
    let output_rate = data.recipe.name == data.name ? data.recipe.output : data.recipe.output2;
    let factor = data.rate / output_rate;
    return <div key={ing} className='inp-cont'>
        <Handle 
          style={{
            left: -30
          }}
          id={'in-' + data.recipe.name + '-' + ing}
          isConnectable={isConnectable}
          position={Position.Left} 
          type='target' />
        <ResourceRate rcname={ing} rate={inp_rate * factor} />
      </div>
  });

  return (
    <div className="recipe-node">
      <div className='inputs'>
        {inputs}
      </div>
      <div className='outputs'>
        <Handle 
          style={{
            right: -10
          }}
          id={'out-' + data.recipe.name}
          isConnectable={isConnectable}
          position={Position.Right} 
          type='source' />
        <ResourceRate rcname={data.recipe.name} rate={data.rate} />
      </div>
    </div>
  );
}
 
export default ResourceRecipe;