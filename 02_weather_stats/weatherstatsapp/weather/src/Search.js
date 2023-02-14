import React, { useState } from "react"
import Temperature from "./Temperature"
import SearchForm from "./SearchForm"
import ResultListItemBoundary from "./ResultListItemBoundary"
import ResultListItemPlace from "./ResultListItemPlace"

const Search = () => {
    const [searchInput, setSearchInput] = useState("")
    const [resultList, setResultList] = useState([])
    const [weather, setWeather] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [loading, setLoading] = useState(false)
    const [weatherLoading, setWeatherLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleResultClick = async (clickedData) => {
        setWeatherLoading(true)
        setWeather(true)
        setError(false)
        await new Promise((resolve) => setTimeout(resolve, 600))
        fetch(`/api/v1/weather?lat=${clickedData.lat}&long=${clickedData.lon}`)
            .then((result) => result.json())
            .then((parsedResult) => {
                setWeather(parsedResult)
                setWeatherLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setWeather(false)
                setWeatherLoading(false)
                setResultList([])
                setError(true)
            })
    }

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
                        This simple weather app is an example of <strong>outbound networking</strong> in a Golem application. It uses the
                        OpenStreetMap API to search for locations and the OpenWeatherMap API to get weather data.
                    </p>
                </div>
            </div>
            <div className="mt-8 mx-18">
                <SearchForm
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    setError={setError}
                    loading={loading}
                    setLoading={setLoading}
                    setResultList={setResultList}
                />
            </div>

            <div className="mt-14">
                {error && (
                    <div className="flex justify-center">
                        <p className="text-gray-500 text-7xl text-center">Something went wrong. Please try again.</p>
                    </div>
                )}
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 -mx-4">
                    {resultList.map((result, index) => (
                        <React.Fragment key={index}>
                            {result.class === "place" && result.address && result.address.city && (
                                <ResultListItemPlace
                                    result={result}
                                    index={index}
                                    handleResultClick={handleResultClick}
                                    selectedCity={selectedCity}
                                    setSelectedCity={setSelectedCity}
                                />
                            )}

                            {result.class === "boundary" &&
                                Object.values(result.address)
                                    .filter((obj) => obj.toLowerCase().includes(searchInput.toLowerCase()))
                                    .map((displayobj, index) => (
                                        <ResultListItemBoundary
                                            result={result}
                                            index={index}
                                            displayobj={displayobj}
                                            handleResultClick={handleResultClick}
                                            selectedCity={selectedCity}
                                            setSelectedCity={setSelectedCity}
                                        />
                                    ))}
                        </React.Fragment>
                    ))}
                </ul>
                {weather && <Temperature weather={weather} weatherLoading={weatherLoading} />}
            </div>
        </div>
    )
}

export default Search
