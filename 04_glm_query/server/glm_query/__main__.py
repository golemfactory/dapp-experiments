import asyncio
import click

from .config import CONFIG
from .app import run_app


@click.group
def _cli():
    pass


@_cli.command()
@click.argument("payment-network", default="rinkeby", type=click.Choice(CONFIG.keys()))
@click.option("--verbose", "-v", is_flag=True, default=False, help="Display additional info.")
@click.option("--debug", "-d", is_flag=True, default=False, help="Display queries and responses.")
def run(payment_network: str, verbose: bool, debug: bool):
    config = CONFIG.get(payment_network)
    print(f"Using network: {payment_network}")
    asyncio.run(run_app(config, verbose, debug))


if __name__ == "__main__":
    _cli()
