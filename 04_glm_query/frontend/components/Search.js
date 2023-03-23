import React, { useState } from "react";
import SearchForm from "./SearchForm";
import Balance from "./Balance";
import ErrorInfo from "./ErrorInfo";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    let selectedNetwork = e.target.network.value;
    let address = e.target.address.value;
    setLoading(true);
    setBalanceLoading(true);
    setError(false);
    try {
      const fetchBalance = await fetch(
        `/api?network=${selectedNetwork}&address=${address}`
      );
      const balance = await fetchBalance.json();
      setBalance(balance.balance.slice(0, 10));
      setLoading(false);
      setBalanceLoading(false);
    } catch (error) {
      setBalance(null);
      setBalanceLoading(false);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4">
        <h1 className="font-bold text-2xl text-blue-600">
          Query Blockchain <span className="font-thin">app</span>
        </h1>
      </div>
      <div className="mt-10 border-t border-b md:mx-24 py-6">
        <div className="flex justify-center mx-16 text-gray-500">
          <p>
            This is a simple GLM balance checker app. It uses the outbound
            networking feature of the Golem Network to query the GLM balance of
            a given Ethereum address. The service consists of a frontend and a
            backend.
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
      <p className="text-sm text-gray-500 italic mt-1  text-center">
        Don&apos;t have a Ethereum address?{" "}
        <span
          onClick={() => {
            setSearchInput("0xD1f6Cdaa07db319f282a5E393aE0df0DeDD0058D");
          }}
          className="underline font-bold cursor-pointer"
        >
          Give me a random one
        </span>
      </p>

      <div className="mt-14">
        {error && <ErrorInfo />}
        {balance ? (
          <Balance balance={balance} balanceLoading={balanceLoading} />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
