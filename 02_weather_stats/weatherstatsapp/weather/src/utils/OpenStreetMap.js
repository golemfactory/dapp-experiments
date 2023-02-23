export const prepareForDisplay = (openStreetMapResponse, lastSearch) => {
  return openStreetMapResponse
    .filter((entry) => entry.class === "place" || entry.class === "boundary")
    .map((entry) => {
      if (entry.class === "place" && entry.address.city) {
        return {
          lat: entry.lat,
          lon: entry.lon,
          value: entry.address.city,
        };
      } else {
        const matchedName = Object.values(entry.address).find((obj) =>
          obj.toLowerCase().includes(lastSearch.toLowerCase())
        );

        if (matchedName) {
          return {
            lat: entry.lat,
            lon: entry.lon,
            value: `${matchedName}, ${entry.address.country}`,
          };
        } else if (entry.address.city !== undefined) {
          return {
            lat: entry.lat,
            lon: entry.lon,
            value: `${entry.address.city}, ${entry.address.country}`,
          };
        } else if (entry.address.administrative !== undefined) {
          return {
            lat: entry.lat,
            lon: entry.lon,
            value: `${entry.address.administrative}, ${entry.address.country}`,
          };
        } else {
          console.log("This place isn't a valid result", entry);
          return null;
        }
      }
    })
    .filter((entry) => entry !== null);
};

export async function fetchPlaces(searchInput) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=${searchInput}`
  );

  const parsedResult = await response.json();

  return parsedResult;
}
