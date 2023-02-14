from flask import Flask, render_template, request
from typing import Optional

from .config import CONFIG
from .scanner import Scanner

app = Flask("GLM Query")
_verbose: bool = False
_debug: bool = False


@app.route("/", methods=["get"])
def root_get():
    networks = CONFIG.keys()
    eth_network = request.args["network"] if request.args else "rinkeby"

    if not request.args.get("address", ""):
        return render_template("index.html", eth_network=eth_network, networks=networks)

    config = CONFIG.get(eth_network)
    address = request.args["address"]
    error = ""
    balance = ""

    scanner = Scanner(config=config, verbose=_verbose, debug=_debug)
    try:
        balance = scanner.get_balance_ether(address)
    except ValueError:
        error = "Bad address given"

    return render_template("index.html", address=address, balance=balance, eth_network=eth_network, networks=networks, error=error)


async def run_app(verbose: bool=False, debug: bool=False):
    global _verbose, _debug
    _verbose = verbose
    _debug = debug

    app.run(host="0.0.0.0")
