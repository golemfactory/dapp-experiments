import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectNetwork = ({ networks, network, setNetwork, colSpan }) => {
  return (
    <>
      <input type="hidden" name="network" value={network.value} />
      <Listbox value={network} onChange={setNetwork}>
        {({ open }) => (
          <>
            <div className={`col-span-${colSpan} relative`}>
              <Listbox.Button className="relative w-full h-full bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm cursor-pointer sm:text-sm sm:leading-6">
                <span className="block truncate">{network.displayName}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {networks.map((network) => (
                    <Listbox.Option
                      key={network.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-golemblue text-white" : "text-gray-900",
                          "relative cursor-pointer select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={network}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {network.displayName}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};

export default SelectNetwork;
