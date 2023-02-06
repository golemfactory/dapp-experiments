from decimal import Decimal
from web3 import Web3


def wei_to_ether(value) -> Decimal:
    return Decimal(Web3.fromWei(value, "ether"))


def ether_to_wei(value: Decimal) -> int:
    return Web3.toWei(value, "ether")
