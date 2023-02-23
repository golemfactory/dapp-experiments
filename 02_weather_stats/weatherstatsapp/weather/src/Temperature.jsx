import { LoadingIcon } from "./Icons";

export const Temperature = ({ weather, weatherLoading }) => (
  <div className="flex items-center justify-center w-full mt-16">
    <div className="p-10 md:w-2/3 bg-white rounded-full shadow-lg border">
      <div className="grid justify-items-center">
        <p className="-mb-1 grid justify-items-start text-left font-light text-gray-500">
          Temp
        </p>
        {weatherLoading ? (
          <LoadingIcon />
        ) : (
          <p className="text-6xl font-light text-gray-600">
            {weather.temperature}℃
          </p>
        )}
      </div>
    </div>
  </div>
);
