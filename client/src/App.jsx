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

  const handleSearch = () => {
    const baseURL = "https://api.givebacks.com/services/core/causes/search?";
    let nameURL = "";
    let cityURL = "";
    let stateURL = "";
    let count = 0;

    if (searchName) {
      nameURL = `search[name][value]=${searchName}`;
      count++;
    }
    if (searchCity) {
      cityURL = `search[city][value]=${searchCity}`;
      count++;
    }
    if (searchState) {
      stateURL = `search[state][value]=${searchState}`;
      count++;
    }

    if (count < 2) {
      axios.get(`${baseURL}${nameURL}${cityURL}${stateURL}`).then((res) => {
        setCauses(res.data.causes);
        if (res.data.meta.has_more) {
          setCausesLeft(true);
        } else {
          setCausesLeft(false);
        }
      });
    } else {
      axios
        .get(`${baseURL}join=AND&${nameURL}&${cityURL}&${stateURL}`)
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const baseURL = "https://api.givebacks.com/services/core/causes/search?";
      let nameURL = "";
      let cityURL = "";
      let stateURL = "";
      let count = 0;

      if (searchName) {
        nameURL = `search[name][value]=${searchName}`;
        count++;
      }
      if (searchCity) {
        cityURL = `search[city][value]=${searchCity}`;
        count++;
      }
      if (searchState) {
        stateURL = `search[state][value]=${searchState}`;
        count++;
      }

      if (count < 2) {
        axios.get(`${baseURL}${nameURL}${cityURL}${stateURL}`).then((res) => {
          setCauses(res.data.causes);
          if (res.data.meta.has_more) {
            setCausesLeft(true);
          } else {
            setCausesLeft(false);
          }
        });
      } else {
        axios
          .get(`${baseURL}join=AND&${nameURL}&${cityURL}&${stateURL}`)
          .then((res) => {
            setCauses(res.data.causes);
            if (res.data.meta.has_more) {
              setCausesLeft(true);
            } else {
              setCausesLeft(false);
            }
          });
      }
    }
  };

  return (
    <div className="App">
      <header className="p-8 flex justify-between items-center">
        <h1 className="text-orange-400 text-4xl font-medium">givebacks</h1>{" "}
        <div className="search flex items-center bg-gray-50 border border-gray-300 rounded-lg divide-x">
          <div className="search-name">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Cause Name"
              className="rounded-l-lg bg-gray-50 text-gray-900 text-sm  focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 "
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="search-city">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="City"
              className="bg-gray-50 text-gray-900 text-sm  focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5"
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="search-state">
            <input
              type="text"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              placeholder="State"
              className=" bg-gray-50 text-gray-900 text-sm  focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 "
              onKeyDown={handleKeyPress}
            />
          </div>
          <button
            onClick={() => {
              handleSearch();
            }}
            className=" mx-2 h-8 w-16 text-orange-400 hover:text-white !border border-orange-400 hover:bg-orange-500 focus:ring-2 focus:outline-none focus:ring-orange-300  rounded-lg text-xs text-center "
          >
            Search
          </button>
        </div>
      </header>

      <div className="causes">
        {causes.length < 1 ? (
          <h2>No availble causes!</h2>
        ) : (
          <>
            {causesLeft ? (
              <h2 className="py-4 text-2xl">{`Over ${causes.length} results:`}</h2>
            ) : (
              <h2>{`${causes.length} results:`}</h2>
            )}
            <div className="cause-cards grid gap-8 grid-cols-4 px-4 ">
              {causes.map((cause) => {
                return (
                  <div
                    className="single-cause p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-between gap-4"
                    key={cause.id}
                  >
                    <div>
                      <p className="text-xl">{cause.name}</p>
                    </div>
                    <div>
                      <p className="text-md">{cause.address}</p>
                    </div>
                    <div>
                      <a href={cause.details_url} target="_blank">
                        <button
                          type="button"
                          class="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
                        >
                          Details
                        </button>
                      </a>
                      <a href={cause.join_url} target="_blank">
                        <button
                          type="button"
                          class="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
                        >
                          Support
                        </button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
