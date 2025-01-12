import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [nodeToUse, setNodeToUse] = useState("");
  const [blockchainData, setBlockchainData] = useState(
    "No data fetched yet..."
  );

  // Update the selected node
  const handleNodeSelection = (event) => {
    setNodeToUse(event.target.value);
  };

  // Fetch blockchain data from the selected node
  const fetchBlockchainData = async () => {
    if (!nodeToUse) {
      alert("Please select a node!");
      return;
    }

    try {
      const response = await fetch(`${nodeToUse}/blockchain`);
      const data = await response.json();
      setBlockchainData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching blockchain data:", error);
      setBlockchainData("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Blockchain Dashboard</h1>
      </header>
      <main>
        <section className="node-selector">
          <label htmlFor="nodes">Select a Node:</label>
          <select id="nodes" onChange={handleNodeSelection}>
            <option value="">-- Choose Node --</option>
            <option value="http://localhost:3001">Node 1</option>
            <option value="http://localhost:3002">Node 2</option>
            <option value="http://localhost:3003">Node 3</option>
            <option value="http://localhost:3004">Node 4</option>
            <option value="http://localhost:3005">Node 5</option>
          </select>
          <button onClick={fetchBlockchainData}>Fetch Blockchain Data</button>
        </section>
        <section className="data-display">
          <h2>Blockchain Data</h2>
          <pre>{blockchainData}</pre>
        </section>
      </main>
    </div>
  );
};

export default App;
