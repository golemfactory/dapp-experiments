import { LoadingIcon } from "./Icons"

const Balance = ({ balance, balanceLoading }) => (
    <div className="flex items-center justify-center w-full mt-16">
        <div className="p-10 md:w-2/3 bg-white rounded-full shadow-lg border">
            <div className="grid justify-items-center">
                <p className="-mb-1 grid justify-items-start text-left font-light text-gray-500">GLM Balance</p>
                {balanceLoading ? (
                    <div className="mt-3">
                        <LoadingIcon color={"black"} />
                    </div>
                ) : (
                    <p className="text-6xl font-light text-gray-600 break-words	">{balance}</p>
                )}
            </div>
        </div>
    </div>
)

export default Balance
