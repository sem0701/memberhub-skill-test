import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [causes, setCauses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    axios
      .get("https://api.givebacks.com/services/core/causes/search")
      .then((res) => setCauses(res.data.causes));
  }, []);

  const handleSearchName = () => {
    axios
      .get(
        `https://api.givebacks.com/services/core/causes/search?search[name][value]=${search}`
      )
      .then((res) => setCauses(res.data.causes));
  };

  console.log(causes);
  return (
    <div className="App">
      <header>Givebacks</header>
      <div className="search">
        <div className="search__name">
          <p>Search cause by name:</p>
          <label htmlFor="name-search">Cause Name: </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter Cause Here"
          />
          <button
            onClick={() => {
              handleSearchName();
            }}
          >
            Search
          </button>
        </div>
        <div className="search__location">
          <p>Search cause by location:</p>
          <label htmlFor="city-search"></label>
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter Cause Here"
          />
          <button
            onClick={() => {
              handleSearchName();
            }}
          >
            Search
          </button>
        </div>
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
