import { Handle, Position } from '@xyflow/react';
import ResourceRate from '../jsx/ResourceRate.jsx'
import React from 'react';
import './style.css'
import powerShard from '../assets/Power_Shard.webp';
import somersloop from '../assets/Somersloop.webp';
import { useState } from 'react';
import { machines_total } from '../satis/calculator.js';
import machines from '../satis/machines_db.js';

function ResourceRecipe({ data, isConnectable }) {
  let rcinfo = data.rcinfo;
  let recipe = rcinfo.recipe;
  let output_rate = rcinfo.recipe.name == data.name ? recipe.output : recipe.output2;
  let output_name = data.name;
  let factor = rcinfo.rate / output_rate;

  let secondary_output_rate = recipe.name == data.name ? recipe.output2 : recipe.output;
  let secondary_output_name = recipe.name == data.name ? recipe.name2 : recipe.name;
  secondary_output_rate *= factor;

  if (!secondary_output_name) {
    secondary_output_rate = null;
  }

  let avg_overclocking = Math.round((100 + (rcinfo.cur_power_shards / machines_total(factor, rcinfo.cur_power_shards)) * 50) * 10) / 10;
  let out_factor = Math.round((1 + rcinfo.cur_somersloops / machines_total(factor, rcinfo.cur_power_shards) / machines[recipe.machine].somersloop_slots) * 100) / 100

  let inputs = Object.entries(recipe.ingredients).map(([ing, inp_rate]) => {
    return <div key={ing} className='cont'>
        <Handle 
          style={{
            left: -30
          }}
          id={'in-' + output_name + '-' + ing}
          isConnectable={isConnectable}
          position={Position.Left} 
          type='target' />
        <ResourceRate rcname={ing} rate={inp_rate * factor * rcinfo.ing_multiplier} />
      </div>
  });

  const show_modifiers = avg_overclocking != 100 || out_factor != 1;
  return (
    <div className="recipe-node">
      {show_modifiers && <div className="top-modifiers">
        <div><img src={powerShard}/> {avg_overclocking}%<img src={somersloop}/> x{out_factor}</div>
      </div>}
      <p>{Math.round(factor * 1000) / 1000} ({rcinfo.machines_cnt})</p>
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
            <ResourceRate rcname={output_name} rate={rcinfo.rate} />
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
      <div className="modifiers">
        <div className="modifier">
          <div className='cont'>
            <img src={powerShard} alt="Power Shard" />
            <button onClick={() => data.set_power_shards(v => Math.max(0, v - 10))}>--</button>
            <button onClick={() => data.set_power_shards(v => Math.max(0, v - 1))}>-</button>
            <input
              type="number"
              value={rcinfo.cur_power_shards}
              onChange={ev => data.set_power_shards(Number(ev.target.value))}
            />
            <button onClick={() => data.set_power_shards(v => v + 1)}>+</button>
            <button onClick={() => data.set_power_shards(v => v + 10)}>++</button>
          </div>
          <p>max {rcinfo.max_power_shards}</p>
        </div>
        <div className="modifier">
          <div className='cont'>
            <img src={somersloop} alt="Somersloop" />
            <button onClick={() => data.set_somersloops(v => Math.max(0, v - 10))}>--</button>
            <button onClick={() => data.set_somersloops(v => Math.max(0, v - 1))}>-</button>
            <input
              type="number"
              value={rcinfo.cur_somersloops}
              onChange={ev => data.set_somersloops(Number(ev.target.value))}
            />
            <button onClick={() => data.set_somersloops(v => v + 1)}>+</button>
            <button onClick={() => data.set_somersloops(v => v + 10)}>++</button>
          </div>
          <p>max {rcinfo.max_somersloops}</p>
        </div>
      </div>
    </div>
  );
}
 
export default ResourceRecipe;