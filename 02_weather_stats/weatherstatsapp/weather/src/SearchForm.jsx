const SearchForm = ({ searchInput, setSearchInput, setError, loading, setLoading, setResultList }) => {
    const handleSearch = async (e) => {
        e.preventDefault()
        setError(false)
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 800))

        fetch(`https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=${searchInput}`)
            .then((result) => result.json())
            .then((parsedResult) => {
                setResultList(parsedResult)
            })
        setLoading(false)
    }
    return (
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
                            className="w-7 h-7 mx-4 ml inline-block text-white animate-spin"
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
    )
}

export default SearchForm
