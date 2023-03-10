from flask import Flask, render_template, request, jsonify
from typing import Optional

from .config import CONFIG
from .scanner import Scanner
from flask_cors import CORS, cross_origin


app = Flask("GLM Query")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
_verbose: bool = False
_debug: bool = False


@app.route("/api", methods=["get"])
@cross_origin()
def root_get():
    networks = CONFIG.keys()

    if not request.args.get("address", ""):
        return "An address is required", 400
    if not request.args.get("network", ""):
        return f"A network is required. Choose between rinkeby, mainnet and polygon.", 400
    eth_network = request.args["network"]
    config = CONFIG.get(eth_network)
    address = request.args["address"]
    error = ""
    balance = ""

    scanner = Scanner(config=config, verbose=_verbose, debug=_debug)
    try:
        balance = scanner.get_balance_ether(address)
        return {"balance": balance}
    except ValueError:
        error = "Bad address given"
        return {"error": error}, 400

async def run_app(verbose: bool=False, debug: bool=False):
    global _verbose, _debug
    _verbose = verbose
    _debug = debug

    app.run(host="0.0.0.0", port=9000)
