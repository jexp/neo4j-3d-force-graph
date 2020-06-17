import React from 'react';
import './App.css';
import ForceGraph2D from 'react-force-graph-2d';

// Usage: <CypherViz driver={driver}/>

class CypherViz extends React.Component {
    constructor({driver}) {
      super();
      this.driver = driver;
      this.state = { 
        query: `
        MATCH (n:Character)-[:INTERACTS1]->(m:Character) 
        RETURN n.name as source, m.name as target
        `,
        data : {nodes:[{name:"Joe"},{name:"Jane"}],links:[{source:"Joe",target:"Jane"}]} }
    }
  
    handleChange = (event) => {
      this.setState({query:event.target.value})
    }
    loadData = async () => {
      let session = await this.driver.session({database:"gameofthrones"});
      let res = await session.run(this.state.query);
      session.close();
      console.log(res);
      let nodes = new Set();
      let links = res.records.map(r => {
        let source = r.get("source");
        let target = r.get("target");
        nodes.add(source);
        nodes.add(target);
        return {source, target}});
      nodes = Array.from(nodes).map(name => {return {name}});
      this.setState({ data : {nodes, links}});
    }
    
    render() {
      return (
        <div>
          <textarea style={{display:"block",width:"800px", height:"100px"}} 
                    value={this.state.query}
                    onChange={this.handleChange}/>
          <button onClick={this.loadData}>Reload</button>
          <ForceGraph2D graphData={this.state.data} nodeId="name" 
                    linkCurvature={0.2} linkDirectionalArrowRelPos={1} linkDirectionalArrowLength={10}/>
        </div>
      );  
    }
  }
  
  export default CypherViz