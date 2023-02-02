import React, { useState } from "react"

const Search = () => {
    const [searchInput, setSearchInput] = useState("")
    const [resultList, setResultList] = useState([])
    const [weather, setWeather] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [loading, setLoading] = useState(false)
    const [weatherLoading, setWeatherLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 800))

        fetch(`https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=${searchInput}`)
            .then((result) => result.json())
            .then((parsedResult) => {
                setResultList(parsedResult)
            })
        setLoading(false)
    }

    const handleResultClick = async (clickedData) => {
        setWeatherLoading(true)
        setWeather(true)
        await new Promise((resolve) => setTimeout(resolve, 600))
        fetch(`/api/v1/weather?lat=${clickedData.lat}&long=${clickedData.lon}`)
            .then((result) => result.json())
            .then((parsedResult) => {
                setWeather(parsedResult)
                setWeatherLoading(false)
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
                <form onSubmit={handleSearch} className="mt-1 flex rounded-md  rounded-r-full rounded-l-full shadow-lg">
                    <input
                        type="text"
                        name="text"
                        required
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                        placeholder="Your location"
                        className="px-6 text-sm py-2 block w-full rounded-l-full border focus:outline-none focus:ring-0 text-black placeholder:text-gray-500"
                    />
                    <div className="w-1/4">
                        <button
                            type="submit"
                            className="relative w-full inline-flex items-center space-x-2 rounded-r-full text-white  text-lg bg-blue-500 px-8 md:px-16 py-2 "
                        >
                            {loading ? (
                                <svg
                                    className="w-7 h-7 mx-4 mt-2 ml inline-block text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-14">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 -mx-4">
                    {resultList.map((result, index) => (
                        <React.Fragment key={index}>
                            {result.class === "place" && result.address && result.address.city && (
                                <li className=" px-4 mb-4">
                                    <p
                                        className={` hover:bg-blue-600 ${
                                            index == selectedCity ? "bg-blue-600 text-white" : "bg-blue-50 text-gray-500"
                                        } hover:text-white  font-semibold h-full text-center flex items-center justify-center px-2 py-1 rounded-full text-sm cursor-pointer`}
                                        onClick={() => {
                                            handleResultClick({ lat: result.lat, lon: result.lon })
                                            setSelectedCity(index)
                                        }}
                                    >
                                        {result.address.city}
                                    </p>
                                </li>
                            )}

                            {result.class === "boundary" &&
                                Object.values(result.address)
                                    .filter((obj) => obj.toLowerCase().includes(searchInput.toLowerCase()))
                                    .map((displayobj) => (
                                        <li className="px-4 mb-4">
                                            <p
                                                className={` hover:bg-blue-600 ${
                                                    index == selectedCity ? "bg-blue-600 text-white" : "bg-blue-50 text-gray-500"
                                                } hover:text-white  font-semibold h-full text-center flex items-center justify-center px-2 py-1 rounded-full text-sm cursor-pointer`}
                                                onClick={() => {
                                                    handleResultClick({ lat: result.lat, lon: result.lon })
                                                    setSelectedCity(index)
                                                }}
                                            >
                                                {displayobj} {result.address.country}
                                            </p>
                                        </li>
                                    ))}
                        </React.Fragment>
                    ))}
                </ul>

                {weather && (
                    <div className="flex items-center justify-center w-full mt-16">
                        <div className="p-10 md:w-2/3 bg-white rounded-full shadow-lg border">
                            <div className="grid justify-items-center">
                                <p className="-mb-1 grid justify-items-start text-left font-light text-gray-500">Temp</p>
                                {weatherLoading ? (
                                    <svg
                                        className="w-10 h-10 mx-4 ml inline-block text-black animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <p className="text-6xl font-light text-gray-600">{weather.temperature}℃</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
