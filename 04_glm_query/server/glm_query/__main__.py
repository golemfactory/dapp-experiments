import asyncio
import click

from .app import run_app


@click.group
def _cli():
    pass


@_cli.command()
@click.option("--verbose", "-v", is_flag=True, default=False, help="Display additional info.")
@click.option("--debug", "-d", is_flag=True, default=False, help="Display queries and responses.")
def run(verbose: bool, debug: bool):
    asyncio.run(run_app(verbose, debug))


if __name__ == "__main__":
    _cli()
