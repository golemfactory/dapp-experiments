from typing import Dict

from fastapi import FastAPI


app = FastAPI()


def get_file(name) -> str:
    with open(name, "r") as file:
        content = file.readlines()
    return content

@app.get("/")
async def health_check() -> Dict[str, str]:
    try:
        return {"Out": f"{get_file('/playground/out.txt')}", "Err": f"{get_file('/playground/err.txt')}"}
    except Exception as err:
        return {"Exception": f"{err}"}


