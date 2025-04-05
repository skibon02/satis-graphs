import { quadtree } from 'd3-quadtree';
 
export function collide(strength = 0.5) {
  let nodes = [];
  let force = (alpha) => {
    // Apply a stronger alpha value for collision
    const correctedAlpha = Math.min(1, alpha * 10 * strength);
    
    const tree = quadtree(
      nodes,
      (d) => d.x,
      (d) => d.y,
    );
 
    for (const node of nodes) {
      // Get node radius - ensure we're using consistent properties
      const nodeRadius = (node.measured?.width || node.width || 40) / 2;
      const nx1 = node.x - nodeRadius;
      const nx2 = node.x + nodeRadius;
      const ny1 = node.y - nodeRadius;
      const ny2 = node.y + nodeRadius;
 
      tree.visit((quad, x1, y1, x2, y2) => {
        if (!quad.length) {
          do {
            if (quad.data !== node) {
              // Ensure consistent radius calculation for other node
              const otherR = (quad.data.measured?.width || quad.data.width || 40) / 2;
              const combinedRadius = nodeRadius + otherR; // Combined radius
              
              let x = node.x - quad.data.x;
              let y = node.y - quad.data.y;
              let l = Math.hypot(x, y);
 
              if (l < combinedRadius) {
                l = (l - combinedRadius) / l * correctedAlpha;
                // Apply a minimum force to prevent nodes from getting stuck
                if (Math.abs(l) < 0.01) l = l < 0 ? -0.01 : 0.01;
                
                node.x -= x *= l;
                node.y -= y *= l;
                quad.data.x += x;
                quad.data.y += y;
                
                // Add a small random jitter if nodes are perfectly overlapping
                if (l === 0) {
                  const jitter = 0.1 * correctedAlpha;
                  node.x += Math.random() * jitter - jitter/2;
                  node.y += Math.random() * jitter - jitter/2;
                }
              }
            }
          } while ((quad = quad.next));
        }
 
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  };
 
  force.initialize = (newNodes) => (nodes = newNodes);
  force.strength = function(x) {
    return arguments.length ? (strength = +x, force) : strength;
  };
 
  return force;
}


export function edgeDirectionForce(strength = 0.3) {
  let nodes = [];
  let edges = [];
  let nodeById = new Map();
  
  // Main force function that applies the force based on edges
  const force = (alpha) => {
    // Process each edge
    for (const edge of edges) {
      const source = nodeById.get(edge.source) || nodeById.get(edge.source.id);
      const target = nodeById.get(edge.target) || nodeById.get(edge.target.id);
      
      // Skip if we couldn't find either node
      if (!source || !target) continue;
      
      // Calculate X-difference between nodes
      const xDiff = target.x - (source.x + source.measured.width);
      if (xDiff > 150) {

      }
      else {
        let force = ((source.x + source.measured.width) - target.x + 150) * strength;
        let limited = Math.min(force, 40);
        target.x += limited * alpha;
        source.x -= limited * alpha;
      }

      const yDiff = target.y - source.y;
      if (Math.abs(yDiff) > 200) {
        let force = yDiff * strength * 0.1;
        let limited = Math.min(force, 10);
        target.y -= limited * alpha;
        source.y += limited * alpha;
      }
    }
  };
  
  // Initialize the force with nodes
  force.initialize = (newNodes) => {
    nodes = newNodes || [];
    
    // Create a map of node id to node for quick lookups
    nodeById.clear();
    if (nodes && nodes.length) {
      for (const node of nodes) {
        if (node && node.id) {
          nodeById.set(node.id, node);
        }
      }
    }
  };
  
  // Method to set/get the edges
  force.edges = function(newEdges) {
    // Ensure newEdges is an array before assigning
    if (arguments.length) {
      edges = Array.isArray(newEdges) ? newEdges : [];
      return force;
    }
    return edges;
  };
  
  // Method to set/get the strength
  force.strength = function(x) {
    return arguments.length ? (strength = +x, force) : strength;
  };
  
  return force;
}

export default { edgeDirectionForce, collide };