import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [causes, setCauses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://api.givebacks.com/services/core/causes/search")
      .then((res) => setCauses(res.data.causes));
  }, []);

  console.log(causes);
  return (
    <div className="App">
      <header>Givebacks</header>
      <div className="search">
        <div className="search__name">
          <label htmlFor="name-search">Search cause by name:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Cause Here"
          />
        </div>
        <div className="search__location"></div>
      </div>
      <div className="causes">
        {causes.map((cause) => {
          return (
            <div className="single-cause">
              <p>{cause.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
