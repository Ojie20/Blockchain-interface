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

  const [transaction, setTransaction] = useState({
    amount: "",
    sender: "",
    recipient: "",
  });
  const [transactionStatus, setTransactionStatus] = useState("");

  // Handle form input changes
  const handleTransactionChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Submit the transaction
  const submitTransaction = async () => {
    if (!nodeToUse) {
      alert("Please select a node!");
      return;
    }

    const { amount, sender, recipient } = transaction;
    if (!amount || !sender || !recipient) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${nodeToUse}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, sender, recipient }),
      });
      const data = await response.json();
      setTransactionStatus(data.note);
      setTransaction({ amount: "", sender: "", recipient: "" });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setTransactionStatus("Failed to submit transaction. Please try again.");
    }
  };

  return (
    <>
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
      <section className="transaction-form">
        <h2>Create Transaction</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitTransaction();
          }}
        >
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleTransactionChange}
              required
            />
          </label>
          <label>
            Sender:
            <input
              type="text"
              name="sender"
              value={transaction.sender}
              onChange={handleTransactionChange}
              required
            />
          </label>
          <label>
            Recipient:
            <input
              type="text"
              name="recipient"
              value={transaction.recipient}
              onChange={handleTransactionChange}
              required
            />
          </label>
          <button type="submit">Submit Transaction</button>
        </form>
        {transactionStatus && <p>{transactionStatus}</p>}
      </section>
    </>
  );
};

export default App;
