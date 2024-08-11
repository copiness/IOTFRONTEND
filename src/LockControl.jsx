import React, { useState } from "react";
import "./lock.css";
const url = "https://lucky-fawn-handkerchief.cyclic.app";
const LockControl = () => {
  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(true);

  const checkLockState = async () => {
    try {
      const response = await fetch(`${url}/lock/state`);
      const data = await response.json();
      setIsLocked(data.isLocked);
    } catch (error) {
      console.error("Error fetching lock state:", error);
    }
  };

  const handleUnlock = async () => {
    try {
      const response = await fetch(`${url}/lock/unlock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      setIsLocked(!data.success);
    } catch (error) {
      console.error("Error unlocking:", error);
    }
  };

  const handleLock = async () => {
    try {
      const response = await fetch(`${url}/lock/lock`, {
        method: "POST",
      });

      const data = await response.json();
      setIsLocked(data.success);
    } catch (error) {
      console.error("Error locking:", error);
    }
  };

  return (
    <div className="lock-control-container">
      <h1>Lock Control By Satu</h1>
      <p>Lock is {isLocked ? "locked" : "unlocked"}</p>

      {isLocked ? (
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleUnlock}>Unlock</button>
        </div>
      ) : (
        <button onClick={handleLock}>Lock</button>
      )}

      <button onClick={checkLockState}>Check Lock State</button>
    </div>
  );
};

export default LockControl;
