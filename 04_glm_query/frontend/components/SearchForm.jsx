import { LoadingIcon } from "./Icons";
import SelectNetwork from "./SelectNetwork";
import { useState } from "react";

const networks = [
  { id: 1, value: "polygon", displayName: "Polygon" },
  { id: 2, value: "mainnet", displayName: "Ethereum Mainnet" },
  { id: 3, value: "rinkeby", displayName: "Rinkeby" },
];

const SearchForm = ({ searchInput, setSearchInput, loading, onSubmit }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  return (
    <form onSubmit={onSubmit} className="mt-1 grid grid-cols-12  shadow-lg">
      <SelectNetwork
        networks={networks}
        network={selectedNetwork}
        setNetwork={setSelectedNetwork}
        colSpan={"2"}
      />
      <input
        type="text"
        name="address"
        required
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        placeholder="Ethereum address"
        className="col-span-8 px-6 text-sm py-2 block w-full  border focus:outline-none focus:ring-0 text-black placeholder:text-gray-500"
      />
      <div className="col-span-2">
        <button
          type="submit"
          className="relative text-white  text-lg bg-golemblue px-8 md:px-16 py-2 "
        >
          {loading ? <LoadingIcon color={"white"} /> : "Check"}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
