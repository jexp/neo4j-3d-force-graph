import React, { useState } from 'react';
import './App.css';
import ForceGraph2D from 'react-force-graph-2d';
import { useReadCypher } from 'use-neo4j'

export default function CypherViz() {
  const [query, setQuery] = useState(`
  MATCH (n:Character)-[:INTERACTS_SEASON1]->(m:Character) 
  RETURN n.name as source, m.name as target
  `);
  const { loading, records, error } = useReadCypher(query, {}, 'gameofthrones');
console.log(loading, (records|| []).length, error)
  let result;
  if (loading) {
    result = (<p>Loading ...</p>);
  } else if (error) {
    result = `Error ${error}`
  }else if (records) {
    let nodes = new Set();
    let links = records.map(r => {
      let source = r.get("source");
      let target = r.get("target");
      nodes.add(source);
      nodes.add(target);
      return {source, target}});
    nodes = Array.from(nodes).map(name => {return {name}});
    const data = {nodes, links};

    result = (<ForceGraph2D graphData={data} nodeId="name"
      linkCurvature={0.2} linkDirectionalArrowRelPos={1}
      linkDirectionalArrowLength={10} />)
  } 
  return (
    <div>
      <textarea style={{ display: "block", width: "800px", height: "100px" }}
        value={query} onChange={e => setQuery(e.target.value)}
        />
      <button>Reload</button>
      {result}
    </div>
  );
}
// onClick={this.loadData}
// onChange={this.handleChange} 