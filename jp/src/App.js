import "./App.css";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("Click a button to see Nisha's response.");

  return (
    <div className="container">
      <h1>Does NISHA like JP? 👋</h1>

      <h2>{message}</h2>

      <button
        onClick={() =>
          setMessage("Nisha has no emotion for normal JP.")
        }
      >
        Normal JP
      </button>

      <br /><br />

      <button
        onClick={() =>
          setMessage("Nisha is impressed but has no further ideas for this JP.")
        }
      >
        Smart and Lean JP
      </button>

      <br /><br />

      <button
        onClick={() =>
          setMessage("❤️ NISHA LIKES JP ❤️")
        }
      >
        Fit JP
      </button>
    </div>
  );
}

export default App;