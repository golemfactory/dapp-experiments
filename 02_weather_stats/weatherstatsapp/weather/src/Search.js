import React, { useState } from "react";
import { Temperature } from "./Temperature";
import SearchForm from "./SearchForm";
import ResultListItem from "./ResultListItem";
import { ErrorInfo } from "./ErrorInfo";
import { fetchPlaces, prepareForDisplay } from "./utils/OpenStreetMap";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [resultList, setResultList] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleResultClick = async (clickedData) => {
    setWeatherLoading(true);
    setWeather(true);
    setError(false);
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      const response = await fetch(
        `/api/v1/weather?lat=${clickedData.lat}&long=${clickedData.lon}`
      );
      const parsedResult = await response.json();
      setWeather(parsedResult);
      setWeatherLoading(false);
    } catch (error) {
      console.error(error);
      setWeather(false);
      setWeatherLoading(false);
      setResultList([]);
      setError(true);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      const parsedResult = await fetchPlaces(searchInput);

      setResultList(parsedResult);
      setLastSearch(searchInput);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
      setResultList([]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4">
        <img src="weather.png" alt="logo" className="w-16 h-16 rounded-full" />
        <h1 className="font-bold text-2xl text-blue-600">
          weather <span className="font-thin">app</span>
        </h1>
      </div>
      <div className="mt-10 border-t border-b md:mx-24 py-6">
        <div className="flex justify-center mx-16 text-gray-500">
          <p>
            This simple weather app is an example of{" "}
            <strong>outbound networking</strong> in a Golem application. It uses
            the OpenStreetMap API to search for locations and the OpenWeatherMap
            API to get weather data.
          </p>
        </div>
      </div>
      <div className="mt-8 mx-18">
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          loading={loading}
          onSubmit={handleSearch}
        />
      </div>

      <div className="mt-14">
        {error && <ErrorInfo />}
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 -mx-4">
          {prepareForDisplay(resultList, lastSearch).map((result, index) => (
            <ResultListItem
              result={result}
              key={index}
              index={index}
              value={result.value}
              handleResultClick={handleResultClick}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          ))}
        </ul>
        {weather && (
          <Temperature weather={weather} weatherLoading={weatherLoading} />
        )}
      </div>
    </div>
  );
};

export default Search;
