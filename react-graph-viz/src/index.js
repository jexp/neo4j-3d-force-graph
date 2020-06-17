import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as neo4j from  'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://demo.neo4jlabs.com',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'gameofthrones',
    process.env.NEO4J_PASSWORD || 'gameofthrones'
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

ReactDOM.render(
  <React.StrictMode>
    <App driver={driver}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
