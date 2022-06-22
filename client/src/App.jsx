import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [causes, setCauses] = useState([]);
  const [causesLeft, setCausesLeft] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    axios
      .get("https://api.givebacks.com/services/core/causes/search")
      .then((res) => {
        setCauses(res.data.causes);
        if (res.data.meta.has_more) {
          setCausesLeft(true);
        } else {
          setCausesLeft(false);
        }
      });
  }, []);

  const handleSearchName = () => {
    axios
      .get(
        `https://api.givebacks.com/services/core/causes/search?search[name][value]=${searchName}`
      )
      .then((res) => {
        setCauses(res.data.causes);
        if (res.data.meta.has_more) {
          setCausesLeft(true);
        } else {
          setCausesLeft(false);
        }
      });
  };

  const handleSearchLocation = () => {
    if (!!searchCity && !!searchState === false) {
      //fetch for city
      axios
        .get(
          `https://api.givebacks.com/services/core/causes/search?search[city][value]=${searchCity}`
        )
        .then((res) => {
          setCauses(res.data.causes);
          if (res.data.meta.has_more) {
            setCausesLeft(true);
          } else {
            setCausesLeft(false);
          }
        });
    } else if (!!searchState && !!searchCity === false) {
      //fetch for state
      axios
        .get(
          `https://api.givebacks.com/services/core/causes/search?search[state][value]=${searchState}`
        )
        .then((res) => {
          setCauses(res.data.causes);
          if (res.data.meta.has_more) {
            setCausesLeft(true);
          } else {
            setCausesLeft(false);
          }
        });
    } else {
      //fetch for both
      axios
        .get(
          `https://api.givebacks.com/services/core/causes/search?join=AND&search[city][value]=${searchCity}&search[state][value]=${searchState}`
        )
        .then((res) => {
          setCauses(res.data.causes);
          if (res.data.meta.has_more) {
            setCausesLeft(true);
          } else {
            setCausesLeft(false);
          }
        });
    }
  };

  console.log(causesLeft);

  return (
    <div className="App">
      <header>
        <h1>Givebacks Cause Search</h1>
      </header>

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
          <h2>No availble causes!</h2>
        ) : (
          <>
            {causesLeft ? (
              <h2>{`Over ${causes.length} results:`}</h2>
            ) : (
              <h2>{`${causes.length} results:`}</h2>
            )}
            {causes.map((cause) => {
              return (
                <div className="single-cause" key={cause.id}>
                  <p>{cause.name}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
