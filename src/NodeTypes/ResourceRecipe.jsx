import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'
import React from 'react';
import './style.css'

function ResourceRecipe({ data, isConnectable }) {
  let output_rate = data.recipe.name == data.name ? data.recipe.output : data.recipe.output2;
  let output_name = data.name;
  let factor = data.rate / output_rate;

  let secondary_output_rate = data.recipe.name == data.name ? data.recipe.output2 : data.recipe.output;
  let secondary_output_name = data.recipe.name == data.name ? data.recipe.name2 : data.recipe.name;
  secondary_output_rate *= factor;

  if (!secondary_output_name) {
    secondary_output_rate = null;
  }

  let inputs = Object.entries(data.recipe.ingredients).map(([ing, inp_rate]) => {
    return <div key={ing} className='cont'>
        <Handle 
          style={{
            left: -30
          }}
          id={'in-' + output_name + '-' + ing}
          isConnectable={isConnectable}
          position={Position.Left} 
          type='target' />
        <ResourceRate rcname={ing} rate={inp_rate * factor} />
      </div>
  });

  return (
    <div className="recipe-node">
      <p>{Math.round(factor * 1000) / 1000}</p>
      <div className="recipe-node-cont">
        <div className='inputs'>
          {inputs}
        </div>
        <div className='outputs'>
          <div className='cont'>
            <Handle 
              style={{
                right: -30
              }}
              id={'out-' + output_name}
              isConnectable={isConnectable}
              position={Position.Right} 
              type='source' />
            <ResourceRate rcname={output_name} rate={data.rate} />
          </div>
          { secondary_output_rate && 
            <div className='cont'>
              <Handle 
              style={{
                right: -30
              }}
              id={'secondary-out-' + output_name}
              isConnectable={isConnectable}
              position={Position.Right} 
              type='source' />
              <ResourceRate rcname={secondary_output_name} rate={secondary_output_rate} />
          </div>}
        </div>
      </div>
    </div>
  );
}
 
export default ResourceRecipe;