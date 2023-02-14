import asyncio
from pathlib import Path
from typing import Optional

from web3 import Web3
from web3.middleware import geth_poa_middleware

from .eth import wei_to_ether


ERC20_ABI_FILE = Path(__file__).parent / "erc20abi.json"


BLOCK_QUERY_INTERVAL = 5.0


def debug_middleware(make_request, w3):  # noqa
    def middleware(method, params):
        print("request", method, params)
        response = make_request(method, params)
        print("response", response)
        return response
    return middleware


class Scanner:

    def __init__(self, config: dict, verbose: bool=False, debug: bool=False):
        self.config = config
        self.verbose = verbose

        self.w3 = Web3(Web3.HTTPProvider(self.config["geth_address"]))

        if debug:
            self.w3.middleware_onion.inject(debug_middleware, layer=0)

        self.contract = self.w3.eth.contract(
            self.config["glm_contract_address"],
            abi=open(ERC20_ABI_FILE, "r").read()
        )

    @property
    def network(self):
        return self.config.get("name", "")

    @property
    def glm(self):
        """Interface for the functions exposed by the GLM contract."""
        return self.contract.functions

    async def scan_blocks(self, from_block: int, to_block: int):
        transactions = list()
        if self.verbose:
            print("blocks: ", list(range(from_block, to_block+1)))
        for e in self.contract.events.Transfer.getLogs(fromBlock=from_block, toBlock=to_block):
            tx_hash = e["transactionHash"].hex()
            args = e["args"]
            transactions.append(
                {
                    "from": args["from"],
                    "to": args["to"],
                    "amount": f"{wei_to_ether(args['value']):.16}",
                    "hash": tx_hash,
                }
            )

    async def run(self, offset: int):
        previous_block_number = self.w3.eth.get_block_number() - offset

        while True:
            new_block_number = self.w3.eth.get_block_number()
            if new_block_number != previous_block_number:
                await self.scan_blocks(previous_block_number + 1, new_block_number)

            previous_block_number = new_block_number
            await asyncio.sleep(BLOCK_QUERY_INTERVAL)

    def get_balance_wei(self, address: str):
        address = Web3.toChecksumAddress(address.lower())
        return self.glm.balanceOf(address).call()

    def get_balance_ether(self, address: str):
        return wei_to_ether(self.get_balance_wei(address))
