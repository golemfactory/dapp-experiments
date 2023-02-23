import { LoadingIcon } from "./Icons";

const SearchForm = ({
  searchInput,
  setSearchInput,
  loading,
  onSubmit
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-1 flex rounded-md  rounded-r-full rounded-l-full shadow-lg"
    >
      <input
        type="text"
        name="text"
        required
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        placeholder="Your location"
        className="px-6 text-sm py-2 block w-full rounded-l-full border focus:outline-none focus:ring-0 text-black placeholder:text-gray-500"
      />
      <div className="w-1/4">
        <button
          type="submit"
          className="relative w-full inline-flex items-center space-x-2 rounded-r-full text-white  text-lg bg-blue-500 px-8 md:px-16 py-2 "
        >
          {loading ? <LoadingIcon /> : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
