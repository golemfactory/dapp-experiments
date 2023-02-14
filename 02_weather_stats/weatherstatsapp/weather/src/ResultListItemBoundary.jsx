const ResultListItemBoundary = ({ result, index, handleResultClick, selectedCity, setSelectedCity, displayobj }) => {
    return (
        <li key={index} className="px-4 mb-4">
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
    )
}

export default ResultListItemBoundary
