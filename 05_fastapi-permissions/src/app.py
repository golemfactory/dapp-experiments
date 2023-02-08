import subprocess
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def api():
    bash_command = "ls -al /"
    process = subprocess.Popen(bash_command.split(), stdout=subprocess.PIPE) 
    output, error = process.communicate()
    return {
        "bash_command": bash_command,
        "output": output,
        "error": error,
    }
