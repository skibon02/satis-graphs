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

export default { edgeDirectionForce };