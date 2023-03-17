from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users/")
def read_userinfo():
    return {"Hello": "World"}
