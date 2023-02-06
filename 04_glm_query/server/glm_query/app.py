from flask import Flask, render_template, request
from typing import Optional

from .scanner import Scanner

app = Flask("GLM Query")
scanner: Optional[Scanner] = None


@app.route("/", methods=["get"])
def root_get():
    eth_network = scanner.network
    if not request.args or not request.args["address"]:
        return render_template("index.html", eth_network=eth_network)

    address = request.args["address"]
    balance = scanner.get_balance_ether(address)
    return render_template("index.html", address=address, balance=balance, eth_network=eth_network)


async def run_app(config: dict, verbose: bool=False, debug: bool=False):
    global scanner

    scanner = Scanner(config=config, verbose=verbose, debug=debug)
    app.run(host="0.0.0.0")
