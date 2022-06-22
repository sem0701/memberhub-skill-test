import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [causes, setCauses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    axios
      .get("https://api.givebacks.com/services/core/causes/search")
      .then((res) => setCauses(res.data.causes));
  }, []);

  const handleSearchName = () => {
    axios
      .get(
        `https://api.givebacks.com/services/core/causes/search?search[name][value]=${searchName}`
      )
      .then((res) => setCauses(res.data.causes));
  };

  const handleSearchLocation = () => {
    if (!!searchCity && !!searchState === false) {
      //fetch for city
      axios
        .get(
          `https://api.givebacks.com/services/core/causes/search?search[city][value]=${searchCity}`
        )
        .then((res) => setCauses(res.data.causes));
    } else if (!!searchState && !!searchCity === false) {
      //fetch for state
      axios
        .get(
          `https://api.givebacks.com/services/core/causes/search?search[state][value]=${searchState}`
        )
        .then((res) => setCauses(res.data.causes));
    } else {
      //fetch for both
      console.log("hit");
      axios
        .get(
          `https://api.givebacks.com/services/core/causes/search?join=AND&search[city][value]=${searchCity}&search[state][value]=${searchState}`
        )
        .then((res) => setCauses(res.data.causes));
    }
  };

  // console.log(!!searchState && !!searchCity);
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
          <label htmlFor="city-search">City: </label>
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter City Here"
          />

          <label htmlFor="state-search">State: </label>
          <input
            type="text"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            placeholder="Enter State Here"
          />
          <button
            onClick={() => {
              handleSearchLocation();
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="causes">
        {causes.length < 1 ? (
          <h1>No availble causes!</h1>
        ) : (
          causes.map((cause) => {
            return (
              <div className="single-cause">
                <p>{cause.name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
